import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import './ContactCard.css'



const Contact = () => {
  const [result, showResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');


  const Result = () => {
    return (
      <p className="notification-message">Your message has been successfully sent. we will come back to you soon !</p>
    )
  }

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if (nameValue, emailValue) {
      emailjs.sendForm('service_uve5gh6', 'template_thmloaf', form.current, '2QcJwGCnGqwiL0ymi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
      showResult(true)
    }
    else {
      return
    }

  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <header> 
          <h1 className="contact-header">Contact us</h1>
        </header>
        <div id="form">
        <form ref={form} id="waterform" method="post" action="" onSubmit={sendEmail}>
          <div className="credentials">
            <div className="formgroup" id="name-form">
                <label className="contact-label" htmlFor="name" placeholder="Enter your name">Your name</label>
                <input className="contact-input" type="text" id="name" name="name" onChange={(event) => {setNameValue(event.target.value);}}
          />
            </div>

            <div className="formgroup" id="email-form">
                <label  className="contact-label" htmlFor="email">Your e-mail</label>
                <input className="contact-input" type="email" id="email" name="email" onChange={(event) => {
            setEmailValue(event.target.value);
          }}
          />
            </div>
          </div>

          <div className="formgroup" id="message-form">
              <label className="contact-label" htmlFor="message">Your message</label>
              <textarea className="contact-textarea" id="message" name="message"></textarea>
          </div>

          <input className="contact-input" type="submit" value="Send your message!" />
          <div className="success-message">
            {
              result ? <Result /> : null
            }
            {
              isSubmitting && !nameValue ? <p className="notification-message">Please fill out your Name and Email address</p> : ''
              
            }
          </div>
        </form>
        </div>
      </div>
    </div>
  )

}

export default Contact;