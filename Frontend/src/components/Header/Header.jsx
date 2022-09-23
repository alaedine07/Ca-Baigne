import React from 'react';
import Navbar from './Navbar';

function Header(props) {
  return (
    <div>
      <Navbar token={props.token} />
    </div>
  );
}

export default Header;
