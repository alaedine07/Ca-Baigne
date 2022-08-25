import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import Home from './Home/Home';
import Header from "./Header/Header";
import Contactpage from "./Contact/Contact";

import './App.css';

const loginContext = React.createContext('false');


export function App() {
    const location = useLocation();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return (
        <React.StrictMode>
        <div>
            <Routes>
                <Route path="/" element={<>
                    <Header isLoggedIn={isLoggedIn}/>
                    <Home isLoggedIn={isLoggedIn}/>
                    </>
                } 
                />
                <Route path="/login" element={ 
                    <SignInForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
                } />
                <Route path="/join" element={ 
                    <SignUpForm isLoggedIn={isLoggedIn} /> 
                }  
                />
                <Route path="/contact" element={
                    <Contactpage />
                } 
                />
            </Routes>
        </div>
        </React.StrictMode>
    );
}

export default App