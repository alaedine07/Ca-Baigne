import React from "react";

import SearchBox from "../LandingPage/SearchBox/SearchBox";
import Contactpage from "../Contact/ContactCard";
import Footer from '../Footer/Footer';
import './Home.css'

export function Home() {
    return (
        <>
        <div className="flex-wrapper">
            <SearchBox />
        </div>
        <div className="contact-us-section">
            <Contactpage />
            
        </div>
        <Footer />
        </>
    )
}

export default Home