import React from 'react';

import "./styles.css";

const Header: React.FC = () => {

  return (
    <div className="header-Component">
      <div className="container">
        <div className="navItem">
          <img src={require('../../assets/Trip_Ninja_Logo.png')} className="logo" alt="logo png" />
        </div>
        <div className="navItem">Flight Search</div>
        <div className="navItem">Bookings</div>
      </div>
    </div>
  )
};

export default Header;
