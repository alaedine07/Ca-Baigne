import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import './ContactCard.css'

const Result = () => {
  return (
    <p>Your message has been successfully sent. we will come back to you soon !</p>
  )
}

const Contact = () => {
  const [result, showResult] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uve5gh6', 'template_thmloaf', form.current, '2QcJwGCnGqwiL0ymi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
      showResult(true)
  };

  return (
    <>
    <div className="contact-card">
      <header> 
        <h1>Contact us</h1>
      </header>
      <div className="fish" id="fish"></div>
      <div className="fish" id="fish2"></div>
      <div id="form">
      <form ref={form} id="waterform" method="post" action="" onSubmit={sendEmail}>
        <div className="credentials">
          <div className="formgroup" id="name-form">
              <label htmlFor="name" placeholder="Enter your name">Your name</label>
              <input type="text" id="name" name="name" />
          </div>

          <div className="formgroup" id="email-form">
              <label htmlFor="email">Your e-mail</label>
              <input type="email" id="email" name="email" />
          </div>
        </div>

        <div className="formgroup" id="message-form">
            <label htmlFor="message">Your message</label>
            <textarea id="message" name="message"></textarea>
        </div>

        <input type="submit" value="Send your message!" />
        <div className="row">
          {
            result ? <Result /> : null
          }
        </div>
      </form>
      </div>
    </div>
    {
      $('document').ready(function(){
        $('input[type="text"], input[type="email"], textarea').focus(function(){
          var background = $(this).attr('id');
          $('#' + background + '-form').addClass('formgroup-active');
          $('#' + background + '-form').removeClass('formgroup-error');
        });
        $('input[type="text"], input[type="email"], textarea').blur(function(){
          var background = $(this).attr('id');
          $('#' + background + '-form').removeClass('formgroup-active');
        });
      
      function errorfield(field){
        $(field).addClass('formgroup-error');
        console.log(field);	
      }
      
      $("#waterform").submit(function() {
        var stopsubmit = false;
      
      if($('#name').val() == "") {
        errorfield('#name-form');
        stopsubmit=true;
      }
      if($('#email').val() == "") {
        errorfield('#email-form');
        stopsubmit=true;
      }
      if($('#message').val() == "") {
        errorfield('#message-form');
        stopsubmit=true;
      }
        if(stopsubmit) return false;
      });
          
      })}
    </>
  )

}

export default Contact;
