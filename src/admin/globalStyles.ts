import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: 24,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
  },
  pageDescription: {
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'lighter',
    margin: '30px 0',
  },
  pageRow: {
    marginTop: 30,
    marginBottom: 0
  },
  radioLabel: {
    display: 'block',
    fontSize: 16,
    color: '#45565E',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bolder',
    marginBottom: 12
  },
  radioRadio: {
    '& .MuiFormControlLabel-label': {
      fontSize: 14,
      fontFamily: 'NeuzitGrotesk',
      color: '#45565E',
    },
    '&:nth-child(2)': {
      marginLeft: '50px',
    }
  },
  btnPrimary: {
    border: '2px solid #45565E',
    borderRadius: 2,
    fontSize: 16,
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
    color: '#45565E',
    textTransform: 'none',

    '&:hover': {
      color: 'white',
      backgroundColor: '#45565E',
    }
  },
  btnFilled: {
    background: '#45565E',
    border: '2px solid #45565E',
    borderRadius: 2,
    fontSize: 16,
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'none',

    '&:hover': {
      background: '#45565EEB'
    }
  }
}))