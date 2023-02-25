import React from 'react';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header">
          <div className="logo">
            <a href="">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="account">
            <div className="text-ava">
              <p className="title">Handicrafted by</p>
              <p className="name">Jim HLS</p>
            </div>
            <a href="">
              <img src={avatar} alt="" />
            </a>
          </div>
        </div>
        <div className="back-ground">
          <div className="box-text">
            <h1>A joke a day keeps the doctor away</h1>
            <p>If you joke wrong way, your teeth have to pay. (Serious)</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
