import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Home/Header/Header'
import Home from '../Home/Home'
import Contactpage from "../Contact/Contact";
import './App.css'

export function App() {
    return (
        <Router>
         <Header/>
         <main>
           <Routes>
             <Route path="/" exact element={<Home />}>
             </Route>
             <Route path="/signin" exact element={''}>
             </Route>
             <Route path="/contact" exact element={<Contactpage />}>
             </Route>
           </Routes>
         </main>
        </Router>
)}

export default App