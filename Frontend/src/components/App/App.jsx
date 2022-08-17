import React from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import Home from './../../../pages/Home/Home'
import About from '../../../pages/About/About'
import './App.css'
export function App() {
    return (
        <Router>
         <Header/>
         <main>
           <Routes>
             <Route path="/" exact element={<Home />}>
             </Route>
             <Route path="/about" exact element={<About />}>
             </Route>
             <Route element={<Navigate to="/" />}>
             </Route>
           </Routes>
         </main>
        </Router>
)}

export default App