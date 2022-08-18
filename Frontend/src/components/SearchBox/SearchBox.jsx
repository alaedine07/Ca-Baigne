import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function SearchBox() {
  const [locationName, setLocation]= useState('');

  const Locations = [
    { id: 84 , name: 'Tunis', beaches: ['Marsa', 'Gammarth']},
    { id: 456 , name: 'Bizerte', beaches: ['Ghar el Melah', 'Rafraf']},
    { id: 16 , name: 'Hammamet', beaches: ['les citronniers', 'les 3 oueds']},
    { id: 855 , name: 'Sousse', beaches: ['Chat Mariem']},
    { id: 17 , name: 'Mahdia', beaches: ['Salakta']},
    { id: 36 , name: 'Djerba', beaches: ['El Seguia', 'Sidi yeti']},
]
  const handlegovernorate= (event) => {
    let getLocation = event.target.value;
    setLocation(getLocation);
    event.preventDefault();
  }
  return (
    <Container className="content">
     <div className="row">
       <div className="col-sm-12">
         <h5 className="mt-4 mb-4 fw-bold text-light">Select your beach</h5>
           
             <div className="row mb-3">
                 <div className="form-group col-md-4">
                 <label className="mb-2 fw-bold text-light">Location</label>
                 <select id="sel1" name="country" className="form-control" onChange={(e)=>handlegovernorate(e)}>
                   <option>--Select Location--</option>
                   {
                    Locations.map( loc => ( 
                       <option key={loc.id}>{loc.name}</option>))
                   }
                 </select>
               </div>
               <div className="form-group col-md-4">
               <label className="mb-2 fw-bold text-light">Beach</label>
               <select id="sel2" name="state" className="form-control">
                   <option>--Select Beach--</option>
                   {
                     Locations.map( (loc, index) => (
                    loc.name === locationName ? loc.beaches.map(beach => <option key={index} value={loc.name}>{beach}</option>)
                    : ''
                   ))
                     }
                 </select>
               </div>

               <div className="form-group col-md-2 mt-4">              
               <button className="btn btn-success mt-2" >Submit</button>               
               </div>
            </div>
               
       </div>
     </div>
    </Container>
  );
}
export default SearchBox;
