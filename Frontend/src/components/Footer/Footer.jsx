import React from 'react';
import { CDBIcon } from 'cdbreact';
import logo from '../../Assets/Images/logo.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
      <div className="footer-logo" to="/" >
        <img className='logo-image' src={logo}></img>
      </div>
        <div className='footer-rights'>
          <small>&copy; Ça baigne, 2022. All rights reserved.</small>
        </div>
        <div className='footer-icons'>
          <div >
            <a href='https://github.com/alaedine07/Ca-Baigne'  target="blank"><CDBIcon fab icon="github" /></a>
          </div>
          <div color="dark">
            <a href='/' target="blank"><CDBIcon fab icon="twitter" /></a>
          </div>
          <div color="dark">
            <a href='/' target="blank"><CDBIcon  fab icon="instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer