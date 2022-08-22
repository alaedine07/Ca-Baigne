import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import Home from './Home/Home';
import Header from "./Header/Header";

import './App.css';

export function App() {
    const location = useLocation();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return (
        <React.StrictMode>
        <div>
            <Routes>
                <Route path="/" element={<><Header/><Home/></>} />
                <Route path="/login" element={ <SignInForm /> } />
                <Route path="/join" element={ <SignUpForm /> } />
            </Routes>
        </div>
        </React.StrictMode>
    );
}

export default App