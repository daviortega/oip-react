import React from 'react'
import videojs from 'video.js'
import PropTypes from 'prop-types';

import { getIPFSURL, getIPFSImage, getFileExtension } from '../../utils.js'

import 'video.js/dist/video-js.css'
import './assets/VideoPlayer.css'

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.defaultVideoOptions = {
	        poster: "",
	        preload: "none",
	        fluid: true,
	        controls: true,
	        autoplay: false,
	        sources: undefined
        };

		let videoOptions = this.props.options ? {...this.defaultVideoOptions, ...this.props.options} : this.defaultVideoOptions;

        this.state = {
	        options: videoOptions,
	        textTracks: [],
	        initialPlay: true,
	        setCaptions: true,
	        artifactFileSwitch: false,
	        lockFile: undefined,
	        Artifact: undefined,
	        ArtifactFile: undefined,
	        usePosterFile: undefined
        };

	    this.initialPlay = true;

	    this.loadPlayer = this.loadPlayer.bind(this);
	    this.resetVideo = this.resetVideo.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
	    let options = prevState.options, textTracks = [], artifactFileSwitch = false;

	    if (nextProps.ArtifactFile && nextProps.Artifact) {
	    	//On Artifact or Artifact File Switch
		    options.controls = true;
		    if (nextProps.ArtifactFile !== prevState.ArtifactFile || nextProps.Artifact !== prevState.Artifact) {
			    options.sources = [];
			    options.preload = "auto";
			    artifactFileSwitch = true;
			    options.poster = getIPFSImage(nextProps.Artifact);
			    options.sources.push({src: getIPFSURL(nextProps.Artifact, nextProps.ArtifactFile), type: "video/mp4"});

			    let tmpObj = {};
			    let files = nextProps.Artifact.getFiles();
			    for (let file of files) {
				    let ext = getFileExtension(file);
				    if (ext === 'vtt') {
					    tmpObj["src"] = getIPFSURL(nextProps.Artifact, file);
					    tmpObj["srclang"] = "en";
					    tmpObj["label"] = "English";
					    tmpObj["kind"] = "subtitles";
					    textTracks.push(tmpObj)
				    }
			    }
		    }
		    //Run when the poster file is toggled on and off
		    if (nextProps.usePosterFile !== prevState.usePosterFile) {
		    	//set artifactFileSwitch to true because we're loading the video with a new source
			    artifactFileSwitch = true;
			    options.sources = [];
			    if (nextProps.usePosterFile === undefined || nextProps.usePosterFile) {
				    options.poster = getIPFSImage(nextProps.Artifact);
				    options.sources.push({src: getIPFSURL(nextProps.Artifact, nextProps.ArtifactFile), type: "video/mp4"});
			    } else {
				    options.sources.push({src: getIPFSURL(nextProps.Artifact, nextProps.ArtifactFile) + "#t=10", type: "video/mp4"});
				    options.poster = "";
			    }
		    }
	    } else {
	    	//If the Artifact or ArtifactFile is undefined set the player to undefined and lock it
		    options = {...options, controls: false, sources: undefined, poster: "", preload: "none", autoplay: false}
	    }
	    //Lock and Unlock the file by change autoplay and controls to true/false
	    if (nextProps.lockFile !== prevState.lockFile) {
		    options.controls = !nextProps.lockFile;
		    options.autoplay = !!(prevState.lockFile && !nextProps.lockFile);
	    }
	    // console.log(`Return variables to state --- options: ${JSON.stringify(options, null, 4)} -- textTracks: ${JSON.stringify(textTracks, null, 4)}`);
	    return {
	    	options: options,
		    textTracks: textTracks,
		    artifactFileSwitch: artifactFileSwitch,
		    lockFile: nextProps.lockFile,
		    Artifact: nextProps.Artifact,
		    ArtifactFile: nextProps.ArtifactFile,
		    usePosterFile: nextProps.usePosterFile
	    }
    }

    componentDidMount() {
	    // instantiate Video.js
	    this.player = videojs(this.videoNode, this.state.options, () => {
		   //do something on player load
	    });
	    this.setState({player: this.player});
	    this.player.on("play", () => this.resetVideo())
    }

    //On initial Play, start the video at the beginning
    resetVideo() {
    	if (this.initialPlay) {
		    this.player.currentTime(0);
		    this.player.play()
			    .then( () => {
				    this.initialPlay = false;
			    })
			    .catch( err => {console.log(err)})
	    }
    }

    loadPlayer() {
	    if (this.player) {
		    this.player.src(this.state.options.sources);
		    this.player.poster(this.state.options.poster);

		    if (this.state.Artifact && this.state.ArtifactFile) {
			    this.player.autoplay(this.state.options.autoplay);
			    this.player.controls(this.state.options.controls);
			    this.player.preload(this.state.options.preload);

			    let tracks = this.player.textTracks().tracks_;
			    for (let tt of tracks) {
			    	this.player.removeRemoteTextTrack(tt)
			    }
			    for (let textTrackObject of this.state.textTracks) {
				    this.player.addRemoteTextTrack(textTrackObject, true)
			    }

		    } else {
		    	//manually reset the cache (resetting the sources)
			    this.player.reset();
		    	this.player.cache_ = {
		    		duration: null,
				    lastPlaybackRate: 1,
				    lastVolume: 1
			    };
		    	//hardcode controls to false; bug with getDerived... @ToDo
		    	this.player.controls(false);
		    	//Re-loads the audio/video element
			    this.player.load()
		    }
	    }
    }

	componentDidUpdate(prevProps, prevState){
    	//checks for new player options and updates the player
    	if (prevState.options !== this.state.options || prevState.textTracks !== this.state.textTracks) {
    		this.loadPlayer()
	    }
	    //If there was an artifact/file switch, we need to set back the initialPlay to true so resetVideo() can run
	    if (this.state.artifactFileSwitch) {
	    	this.initialPlay = true
	    }
	}

    // destroy player on unmount @ToDo: Uncomment when not testing in storybook
    // componentWillUnmount() {
    //     if (this.player) {
    //         this.player.dispose()
    //     }
    // }

    render() {
        return (
            <div data-vjs-player className="videojs-container">
                <video ref={node => this.videoNode = node} className="video-js vjs-oip vjs-big-play-centered">
                    <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="http://videojs.com/html5-video-support/" target="_blank">
                            supports HTML5 video
                        </a>
                    </p>
                </video>
            </div>
        )
    }
}

VideoPlayer.SUPPORTED_FILE_TYPES = ["mp4"];
VideoPlayer.propTypes = {
    Artifact: PropTypes.object,
    ArtifactFile: PropTypes.object,
    options: PropTypes.object,
	lockFile: PropTypes.bool,
	usePosterFile: PropTypes.bool
};

export default VideoPlayer