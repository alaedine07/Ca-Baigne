import React, { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import SearchBox from "../LandingPage/SearchBox/SearchBox";
import './Home.css';


export function Home(props) {
    
    const [imgPath, setImgPath] = useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwt_decode(token);
            const imgPath = decoded['imagePath'];
            setImgPath(imgPath);
        }
    }, []);
    
    return (
        <>
        {imgPath === '' && props.token !== "" &&
            <div className="profile-img-alert"> 
                <a href="/profile"><p> complete your profile by adding profile image </p></a>
            </div>
        }
        <div className="flex-wrapper">
            <SearchBox />
        </div>
        </>
    )
}

export default Home
