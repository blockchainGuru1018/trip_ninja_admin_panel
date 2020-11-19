import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.navItem}>
        <img src={require('../../assets/Trip_Ninja_Logo.png')} className={classes.logo} alt="logo png" />
      </div>
      <div className={classes.navItem}>Flight Search</div>
      <div className={classes.navItem}>Bookings</div>
    </div>
  )
};

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    height: '54px',
    width: '100%',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000029',
    zIndex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    margin: '0 15px',
    color: '#45565E',
    fontSize: '16px',
    fontFamily: 'NeuzitGrotesk',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  logo: {
    height: '32px',
  },
});

export default Header;
