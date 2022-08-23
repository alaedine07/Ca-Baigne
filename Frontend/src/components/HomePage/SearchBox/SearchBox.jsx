import React, { useState } from "react";

import { Container } from "react-bootstrap";
import BeachCard from "../BeachCard";
import { v4 as uuidv4 } from "uuid";

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
  const [results, setResults] = useState(false);

  const Handlelocation = (event) => {
    let getLocation = event.target.value;
    setLocation(getLocation);
    event.preventDefault();
    setResults(false)
    setResult(false)
    setBeach('')
  }

  const Handlebeach = (event) => {
    let getBeach = event.target.value;
    setBeach(getBeach);
    event.preventDefault();
  }
  
  const handleSubmit = () => {
    if (locationName) {
      setResult(false)
      setResults(true)
    }
    if (beachName) {
      setResults(false)
      setResult(true)
    }
  }

  const getAllResults = () => {
    const results = []
    Locations.map( beach => { 
      if (beach.name === locationName) {
        for (let i=0; i < beach.beaches.length; i++) {
          results.push(<BeachCard name={beach.beaches[i]} />)
        }}})
    return results
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
                  <select id='location' name="location" className="form-control" onChange={(e)=>Handlelocation(e)}>
                    <option>--Select Location--</option>
                    {
                      Locations.map( (loc) => ( 
                        <option key={uuidv4()} value={loc.name}>{loc.name}</option>))
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="mb-2 fw-bold text-black">Beach</label>
                <select id ='beach' name="beach" className="form-control" onChange={(e)=>Handlebeach(e)}>
                    <option>--Select Beach--</option>
                    {
                      Locations.map( (loc) => (
                      loc.name === locationName ? loc.beaches.map(beach => <option key={uuidv4()}>{beach}</option>)
                      : ''
                    ))
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" className="btn btn-success mt-2" onClick={handleSubmit}>Submit</button>               
                </div>
              </div>
        </div>
      </div>
      </Container>
      
      {
        result ? 
        <div className="d-flex">
          <BeachCard name={beachName}/>
        </div>
         : 
        null
      }

      { 
        results ?
        <div className="d-flex">
          {getAllResults()}
        </div>
        :
        null
      }
    </>
  );
}

export default SearchBox;