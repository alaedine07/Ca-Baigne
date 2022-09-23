import React from 'react';
import { CDBIcon } from 'cdbreact';
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='footer-container'>
        <div>
          <a href="/" className="d-flex align-items-center pl-5 text-dark">
            <img
            className='footer-logo'
              alt="logo"
              src={require('../../Assets/Images/logo.png')}
              />
              
          </a>
        </div>
        <div>
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