import React , {useEffect} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import Dark from '../Darkmode/Darkmode';

const Navbar = () => {

  function animation(){
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
    });
  }

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
    
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
      Ça baigne
      </NavLink>
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-black"></i>
      </button>
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">

            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                <i 
                className="fa fa-home">
                </i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" exact>
                <i 
                className="fa fa-sign-in-alt">
                </i>Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/join" exact>
                <i 
                className="fa fa-sign-in-alt">
                </i>Join
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" exact>
                <i 
                className="far fa-envelope">
                </i>Contact Us
              </NavLink>
            </li>
            <div style={toggleStyle}>
            <Dark />
            </div>
        </ul>
      </div>
  </nav>
  )
}

const toggleStyle = {
  position: 'absolute',
  right: '5rem',
  top: '1rem'
}

export default Navbar;
