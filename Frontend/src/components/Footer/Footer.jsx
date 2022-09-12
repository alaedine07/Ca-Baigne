import React from 'react';
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

const Footer = () => {
  return (
    <CDBFooter className=" shadow bg-dark text-light">
      <CDBBox display="flex" justifyContent="between" alignItems="center" className="footer-container mx-auto py-4 flex-wrap" style={{ width: '100%' }}>
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center pl-5 text-dark">
            {/*<img
              alt="logo"
              src
              width="30px"/>*/}
            <span className="ml-4 h5 mb-0 font-weight-bold text-light">Ça baigne</span>
          </a>
        </CDBBox>
        <CDBBox>
          <small className="ml-2">&copy; Ça baigne, 2022. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex" className="pr-5">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="github" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon  fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
  );
};

export default Footer