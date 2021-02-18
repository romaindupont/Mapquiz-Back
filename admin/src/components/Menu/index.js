import React from 'react';
import logo from '../../assets/images/logo.png';

const Menu = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <img src={logo} className="navbar-logo" alt="logo"/>
        <h1 className="navbar-title">MapQuiz</h1>
      </div>
    </div> 
  );
}

export default Menu;