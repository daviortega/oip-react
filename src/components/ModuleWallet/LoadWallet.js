import React, { useState, useEffect } from 'react'
import withStyles from 'react-jss'
import { validateMnemonic, generateMnemonic } from 'bip39'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: '11',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit'
  },
  inputBase: {
    height: 33
  },
  inputMnemonic: {
    display: 'flex',
    border: 'none',
    width: '70%',
    borderBottom: `1px ${theme.palette.primary.main} solid`,
    textAlign: 'center',
    maxWidth: '722px'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    top: '-15px'
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 1 30px',
    marginTop: '20px'
  },
  buttonBase: {
    minWidth: '82px',
    border: `1px solid ${theme.palette.primary.main}`,
    margin: [0, 5],
    backgroundColor: `${theme.palette.primary.main}`,
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: '#A8A8A8',
      border: 'none',
      cursor: 'not-allowed'
    }
  },
  loadButton: {
    backgroundColor: `${theme.palette.primary.darken(0.7)}`
  }
})

const LoadWallet = ({
  classes,
  onMnemonicSubmit
}) => {
  const [mnemonicState, setMnemonic] = useState('')
  const [isValidMnemonic, setMnemonicValidToBe] = useState(false)

  useEffect(() => {
    const isValid = validateMnemonic(mnemonicState)
    setMnemonicValidToBe(isValid)
  }, [mnemonicState])

  function handleMnemonicChange (e) {
    setMnemonic(e.target.value)
  }

  function genMnemonic () {
    setMnemonic(generateMnemonic())
  }

  return <div className={classes.root}>
    <div className={classes.contentContainer}>
      <h3 style={{ color: '#989898' }}>enter your mnemonic or create a new wallet</h3>
      <input
        type={'text'}
        value={mnemonicState}
        onChange={handleMnemonicChange}
        className={classNames(classes.inputBase, classes.inputMnemonic)}
        placeholder={'enter your twelve word mnemonic here ob la di ob la da'}
      />
      <div className={classes.buttonRow}>
        <button
          className={classNames(classes.buttonBase, classes.generateButton)}
          onClick={genMnemonic}
        >
          New Wallet
        </button>
        <button
          onClick={() => onMnemonicSubmit ? onMnemonicSubmit(mnemonicState) : null}
          disabled={!isValidMnemonic}
          className={classNames(classes.buttonBase, classes.loadButton)}
        >
          Load Wallet
        </button>
      </div>
    </div>
  </div>
}

export default withStyles(styles)(LoadWallet)
