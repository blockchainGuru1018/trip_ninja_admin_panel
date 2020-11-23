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
  }
}))