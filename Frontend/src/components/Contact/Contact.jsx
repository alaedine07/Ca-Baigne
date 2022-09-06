import React from 'react'
import Contact from './ContactCard';
import './Contact.css'
import Navbar from '../Header/Navbar';
const Contactpage = (props) => {
  return (
      <>  
        <div className='contact-container'>    
          <Contact />
        </div>
      </>
  )
}
export default Contactpage;