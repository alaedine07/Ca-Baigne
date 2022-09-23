import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Dark from '../Darkmode/Darkmode';

import './Navbar.css';

function Navbar(props) {
  const [imagePath, setImagePath] = useState('');

  function handleSignOut() {
    localStorage.removeItem('accessToken');
    const Domain = window.location.origin;
    const URL = `${Domain}/login`;
    window.location.replace(URL);
  }

  // change this use effect to a function and call it in the image div
  useEffect(() => {
    const { token } = props;
    if (token) {
      const decoded = jwt_decode(token);
      const userId = decoded.id;
      axios.get(`${process.env.API_BASE_URL}api/v1/user/${userId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }).then((res) => {
        setImagePath(res.data.imagePath);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [props.token]);

  if (!props.token) {
    return (
      <nav className="navbar navbar-expand-lg navbar-mainbg">

        <NavLink className="navbar-brand navbar-logo" to="/" />
        <button
          className="navbar-toggler"
          onClick={function () {
            setTimeout(() => { animation(); });
          }}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="hamburger fas fa-bars text-black" />
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">

            <div className="hori-selector">
              <div className="left" />
              <div className="right" />
            </div>

            <li key={uuidv4()} className="nav-item active">
              <NavLink onClick={() => { window.location.reload(); }} className="nav-link" to="/">
                <i
                  className="fa fa-home"
                />
                Home
              </NavLink>
            </li>
            <li key={uuidv4()} className="nav-item">
              <NavLink className="nav-link" to="/login">
                <i
                  className="fa fa-sign-in-alt"
                />
                Login
              </NavLink>
            </li>
            <li key={uuidv4()} className="nav-item">
              <NavLink className="nav-link" to="/join">
                <i
                  className="fa fa-sign-in-alt"
                />
                Join
              </NavLink>
            </li>
            <li key={uuidv4()} className="nav-item">
              <NavLink onClick={() => { window.scrollTo(0, document.body.scrollHeight); }} className="nav-link" to="/">
                <i
                  className="far fa-envelope"
                />
                Contact Us
              </NavLink>
            </li>
            <div style={toggleStyle}>
              <Dark />
            </div>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <NavLink className="navbar-brand navbar-logo" to="/" />
      <button
        className="navbar-toggler"
        onClick={function () {
          setTimeout(() => { animation(); });
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-black" />
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">

          <div className="hori-selector">
            <div className="left" />
            <div className="right" />
          </div>

          <li key={uuidv4()} className="nav-item active">
            <NavLink className="nav-link" to="/">
              <i
                className="fa fa-home"
              />
              Home
            </NavLink>
          </li>
          <li key={uuidv4()} className="nav-item active">
            <NavLink className="nav-link" to="/profile">
              <i
                className="fa fa-user"
              />
              Profile
            </NavLink>
          </li>
          <li key={uuidv4()} className="nav-item active" onClick={handleSignOut}>
            <NavLink className="nav-link" to="/">
              <i
                className="fas fa-sign-out-alt"
              />
              Sign out
            </NavLink>
          </li>
          <li key={uuidv4()} className="nav-item">
            <NavLink onClick={() => { window.scrollTo(0, document.body.scrollHeight); }} className="nav-link contact-navlink" to="/">
              <i
                className="far fa-envelope"
              />
              Contact Us
            </NavLink>
          </li>
          { imagePath
            ? (
              <div className="profileImageZone">
                <img src={imagePath} alt="img" />
              </div>
            ) : null}
          <div style={toggleStyle}>
            <Dark />
          </div>
        </ul>
      </div>
    </nav>
  );
}

const toggleStyle = {
  position: 'absolute',
  right: '5rem',
  top: '1rem',
};

export default Navbar;
