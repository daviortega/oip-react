const styles = theme => ({
  recordTemplateRoot: {
    width: 275
    // marginLeft: 'auto',
    // marginRight: 'auto'
  },
  templateFieldRow: {
    position: 'relative'
  },
  selectBase: {
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    border: `1px solid ${theme.palette.greyscale(0.3)}`,
    borderRadius: '3px',
    padding: [3, 2],
    width: '48%'
  },
  inputBase: {
    height: 25,
    boxSizing: 'border-box',
    margin: [15, 0, 13, 0],
    width: 250,
    border: `1px solid ${theme.palette.greyscale(0.3)}`,
    borderRadius: '3px',
    padding: [3, 2],
    fontSize: 12,
    '&::placeholder': {
      fontSize: 10
    }
  },
  buttonBase: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.greyscale(0.3)}`,
    color: theme.palette.greyscale(0.3),
    fontWeight: 'bold'
  },
  inputTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 11,
    color: theme.palette.greyscale(0.7)
  },
  nameRow: {},
  descriptionRow: {},
  wifRow: {},
  publishRow: {
    width: '250px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectNetwork: {
    height: '25px',
    width: '120px'
  },
  publishButton: {},
  // descriptor specific
  descriptorRoot: {},
  descriptorFieldRowContainer: {},
  addRowButton: {
    border: 0,
    margin: [0, 0, 5, 0],
    '&:hover': {
      cursor: 'pointer'
    }
  },
  removeRowButton: {
    marginLeft: 7,
    border: 0,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  descriptorInputField: {},
  descriptorSelect: {},
  selectOptions: {
    width: 250,
    display: 'flex',
    justifyContent: 'space-between'
  },
  // wallet button
  walletButton: {
    '& > button': {
      padding: [4, 8]
    }
  },
  // tags input
  tagsInputRoot: {
    width: 250,
    marginBottom: 13,
    boxSizing: 'border-box'
  }
})

export default styles