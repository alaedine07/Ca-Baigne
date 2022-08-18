import React from "react";
import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import Home from './Home/Home';
import { Routes, Route } from "react-router-dom";
import './App.css';

export function App() {
    return (
        <React.StrictMode>
        <div>
            <h1>
                Hello react app
            </h1>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/login" element={ <SignInForm /> } />
                <Route path="/join" element={ <SignUpForm /> } />
            </Routes>
        </div>
        </React.StrictMode>
    );
}

export default App