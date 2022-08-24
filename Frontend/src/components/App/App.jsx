import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Home/Header/Header'
import Home from '../Home/Home'
import Contactpage from "../Contact/Contact";
import Footer from "../Home/Footer/Footer";
import './App.css'

export function App() {
    return (
      <React.StrictMode>
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
        <Footer />
        </React.StrictMode>
)}

export default App