import React, { useState } from "react";

import { Container } from "react-bootstrap";
import BeachCard from "../BeachCard/BeachCard";

const Locations = [
  { id: 84 , name: 'Tunis', beaches: ['Marsa', 'Gammarth']},
  { id: 456 , name: 'Bizerte', beaches: ['Ghar el Melah', 'Rafraf']},
  { id: 16 , name: 'Hammamet', beaches: ['les citronniers', 'les 3 oueds']},
  { id: 855 , name: 'Sousse', beaches: ['Chat Mariem']},
  { id: 17 , name: 'Mahdia', beaches: ['Salakta']},
  { id: 36 , name: 'Djerba', beaches: ['El Seguia', 'Sidi yeti']},
]

function SearchBox() {
  const [locationName, setLocation]= useState('');
  const [beachName, setBeach] = useState('');
  const [result, setResult] = useState(false);

  const Handlelocation = (event) => {
    let getLocation = event.target.value;
    setLocation(getLocation);
    event.preventDefault();
  }

  const handleSubmit = (e) => {
    const getBeach = $('#beach :selected').text()
    setBeach(getBeach)
    e.preventDefault();
    setResult(true)
  }
  
  return (
    <>
      <Container className="content">
      <div className="row justify-content-center ">
        <div className="col-sm-12">
          <h5 className="mt-4 mb-4 fw-bold text-black text-center">Time to swim</h5>
            
              <div className="row mb-3 align-items-end">
                  <div className="form-group col-md-4">
                  <label className="mb-2 fw-bold text-black">Location</label>
                  <select defaultValue={'DEFAULT'} id='location' name="location" className="form-control" onChange={(e)=>Handlelocation(e)}>
                    <option value="DEFAULT">--Select Location--</option>
                    {
                      Locations.map( loc => ( 
                        <option value={loc.name}>{loc.name}</option>))
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="mb-2 fw-bold text-black">Beach</label>
                <select defaultValue={'DEFAULT'} id ='beach' name="beach" className="form-control">
                    <option value='DEFAULT'>--Select Beach--</option>
                    {
                      Locations.map( (loc, index) => (
                      loc.name === locationName ? loc.beaches.map(beach => <option>{beach}</option>)
                      : ''
                    ))
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" style={btnStyle} className="btn btn-success mt-2" onClick={handleSubmit}>Submit</button>               
                </div>
              </div>
        </div>
      </div>
      </Container>
      {
        result ? <BeachCard name={beachName}/> : <div className="text-center pt-5">
        <h3>No beach selected</h3>
      </div>
      }
    </>
  );
}

const btnStyle = {
  backgroundColor: '#198754'
}

export default SearchBox;
