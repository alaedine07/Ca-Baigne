import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import Home from './Home/Home';
import Profile from "./Profile/Profile";
import NewBeachForm from "./newBeachForm/NewBeach";

import './App.css';

export function App() {
    const [token, setToken] = useState('');

    // check if the user is loged in by verifying if the token is in localStorage
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setToken(token)
        }
    });


    return (
        <React.StrictMode>
        <div>
            <Routes>
                <Route path="/" element={
                    <Home  token={token}/>}
                />
                <Route path="/login" element={
                    <SignInForm /> 
                } />
                <Route path="/join" element={
                    <SignUpForm /> 
                }  
                />
                <Route path="/profile" element={
                    <Profile token={token}/>
                }
                />
                <Route path="/newBeach" element={
                    <NewBeachForm />
                }
                />
            </Routes>
        </div>
        </React.StrictMode>
    );
}

export default App
