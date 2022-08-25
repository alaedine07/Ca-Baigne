import React from 'react'
import Contact from './ContactCard';
import './Contact.css'
import Navbar from '../Header/Navbar';
const Contactpage = () => {
  return (
      <>  
        <Navbar />
        <div className='con'>
          
          <Contact />
        </div>
      </>
  )
}
export default Contactpage;