import React , {useEffect} from 'react'
import { useState } from 'react';
import './Navbar.css';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const Navbar = (props) => {

  const [imagePath, setImagePath] = useState('');

  function animation(){
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
    });
  }

  function handleSignOut() {
    localStorage.removeItem('accessToken');
    const Domain = window.location.origin;
    const URL = Domain + '/login';
    window.location.replace(URL);
  }
  

  useEffect(() => {
      const token = props.token
      if (token) {
          const decoded = jwt_decode(token);
          const userId = decoded['id'];
          axios.get('http://localhost:3001/api/v1/user/' + userId, {
              headers: {
                  'Authorization': 'bearer ' + token
              }
          }).then( res => {
            setImagePath(res.data.imagePath)
          }).catch(err => {
              console.error(err);
          })
      }
    }, [props.token]);
  


  if (!props.token) {
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
                <NavLink className="nav-link" to="/Join" exact>
                  <i 
                    className="fa fa-star">
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
          </ul>
        </div>
    </nav>
    )
  }
  else {
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
              <li className="nav-item active">
                <NavLink className="nav-link" to="/profile" exact>
                  <i 
                  className="fa fa-user">
                  </i>Profile
                </NavLink>
              </li>
              <li className="nav-item active" onClick={handleSignOut}>
                <NavLink className="nav-link" to="/" exact>
                  <i 
                  className="fas fa-sign-out-alt">
                  </i>Sign out
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" exact>
                  <i 
                  className="far fa-envelope">
                  </i>Contact Us
                </NavLink>
              </li>
              {imagePath && 
              <div className="profileImageZone">
                <img src={'http://localhost:3001/' + imagePath.split('/').slice(-3).join('/')} alt="img" />
              </div>
              }
          </ul>
        </div>
    </nav>
    ) 
  }
}
export default Navbar;
