import React from "react";
import SignInForm from './Auth/sign_in';
import SignUpForm from "./Auth/sign_up";
import './App.css';

export function App() {
    return (
        <React.StrictMode>
        <div>
            <h1>
                Hello react app!!
            </h1>
            <SignInForm />
            <SignUpForm />
        </div>
        </React.StrictMode>
    );
}

export default App