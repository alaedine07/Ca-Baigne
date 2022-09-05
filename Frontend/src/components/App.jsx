import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { useState } from "react";
import { useEffect } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 23ddd0168db327500271bb0edac8c6f15b8783aa

import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import Home from './Home/Home';
import Header from "./Header/Header";
import Contactpage from "./Contact/Contact";
import Footer from './Footer/Footer';
import Profile from "./Profile/Profile";
import NewBeachForm from "./newBeachForm/NewBeach";

import './App.css';

<<<<<<< HEAD

export function App() {
    const location = useLocation();

    const [token, setToken] = useState('');

    // check if the user is logedin by verifying if the token is in localStorage
    useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setToken(token)
    }
        });

=======
export function App() {
    const [token, setToken] = useState('');

    // check if the user is logedin by verifying if the token is in localStorage
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setToken(token)
        }
    });


>>>>>>> 23ddd0168db327500271bb0edac8c6f15b8783aa
    return (
        <React.StrictMode>
        <div>
            <Routes>
                <Route path="/" element={<>
                    <Header token={token}/>
                    <Home   token={token}/>
                    </>
                } 
                />
<<<<<<< HEAD
                <Route path="/login" element={ 
                    <SignInForm /> 
                } />
                <Route path="/join" element={ 
                    <SignUpForm /> 
                }  
                />
                <Route path="/contact" element={
                    <Contactpage token={token}/>
                }
                />
                <Route path="/profile" element={
                    <Profile token={token}/>
                }
                />
                <Route path="/newBeach" element={
                    <NewBeachForm />
                }
=======
                <Route path="/login" element={<>
                    
                    <SignInForm /> 
                </>} />
                <Route path="/join" element={ <>
                    
                    <SignUpForm /> 
                </>}  
                />
                <Route path="/contact" element={
                    <>
                    <Header token={token}/>
                    <Contactpage  token={token}/>
                    </>
                } 
>>>>>>> 23ddd0168db327500271bb0edac8c6f15b8783aa
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
        <Footer />
        </React.StrictMode>
    );
}

export default App