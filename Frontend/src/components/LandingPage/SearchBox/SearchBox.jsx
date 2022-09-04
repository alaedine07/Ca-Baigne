import React, { useState} from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import BeachResults from "../SearchResult/BeachResults";
import './SearchBox.css'

function SearchBox() {
  const [locationName, setLocation]= useState();
  const [beachName, setBeach] = useState();
  // sets to true when specefic beach is selected
  const [result, setResult] = useState(false);
  // sets to true when multiple beaches are selected (beaches carousel)
  const [results, setResults] = useState(false);
  const [beachArray, setBeachArray] = useState([]);

  const Handleresults = () => {
    setResult(false);
    setResults(false);
    setBeach('');
  }

  const Handlelocation = (event) => {
    Handleresults();
    let getLocation = event.target.value;
    setLocation(getLocation);
  }

  const Handlebeach = (event) => {
    let getBeach = event.target.value;
    setBeach(getBeach);
    event.preventDefault();
  }

  const handleSubmit = () => {
    // if only a location is selected turn the display to multiple beaches (carousel)
    if (locationName) {
      setResult(false);
      setResults(true);
    }
    // if a beach is selected turn the display to one beach
    if (beachName) {
      setResults(false);
      setResult(true);
    }
  }

  // fetch all beaches when a beach is selected and set the beachArray state to result
  const getallBeaches = () => {
    axios.get('http://localhost:3001/api/v1/beach/allbeaches')
    .then(response => {
      const beaches = []
      response.data.beaches.map(
        data => data.governorate.toLowerCase() === locationName.toLowerCase()
         ?
         beaches.push([{
          name: data.name,
          id: data.id,
          location: data.governorate,
          amenities: data.amenities,
          option: <option key={data.id}>{data.name}</option>,
          imagepath: data.imagepath,
          latitude: data.latitude,
          longitude: data.longitude,
    }])
         :
         null
    )
      setBeachArray(beaches)
    })
    .catch(error => {
      if (error) console.error(error)
    })
  }

  return (
    <>
      <h2 className="header-text">Time to swim </h2>
      <Container className="content" style={divStyle}>
      <div className="row justify-content-center ">
        <div className="">
              <div className="row mb-3 align-items-end">
                  <div className="form-group col-md-4">
                  <label className="label mb-2 fw-bold text-black">Location</label>
                  <select id='select' name="location" className="form-control" onClick={locationName? getallBeaches : null} onChange={Handlelocation} value={locationName}>
                    <option hidden>--Select Location--</option>
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Nabeul</option>
                    <option>Sousse</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="label mb-2 fw-bold text-black">Beach</label>
                <select id ='select' name="beach" className="form-control" onChange={Handlebeach} value={beachName}>
                    <option hidden>--Select Beach--</option>
                    {
                      beachArray.map(beaches => beaches.map(beach => beach.option))
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" className="btn btn-success mt-2" style={btnStyle} onClick={handleSubmit}>Submit</button>               
                </div>
              </div>
        </div>
      </div>
      <div>
      
    </div>
      </Container>
        <div className="beachResults">
          <BeachResults
            beachArray={beachArray}
            locationName={locationName}
            beachName={beachName}
            result={result}
            results={results}
          />
        </div>
  </>
  );
}

const divStyle = {
  paddingBottom: '4rem'
};
const btnStyle = {
  backgroundColor: '#198754'
}

export default SearchBox;