import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import jwt_decode from 'jwt-decode';
import { Container } from "react-bootstrap";
import Header from "../../Header/Header";
import BeachResults from "../SearchResult/BeachResults";
import FavoriteCard from '../BeachCard/FavoriteCard'
import './SearchBox.css'

function SearchBox() {
  const [locationName, setLocation]= useState();
  const [beachName, setBeach] = useState();
  // sets to true when specefic beach is selected
  const [result, setResult] = useState(false);
  // sets to true when multiple beaches are selected (beaches carousel)
  const [results, setResults] = useState(false);
  // sets all beaches for selected governorate
  const [governorateArray, setGovernorateArray] = useState([]);
  // sets all beaches from database
  const [beachArray, setBeachArray] = useState([])
  // sets an array of all pinned beaches related to user
  const [pinnedArray, setPinnedArray] = useState([])


  const [token, setToken] = useState('');

    // check if the user is logedin by verifying if the token is in localStorage
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          setToken(token)
        }
    });

  const ref = useRef(null);


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
    ref.current?.scrollIntoView({behavior: "smooth"});
  }

  // check if user is logged in
  function checkLogin() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
  }

  useEffect(() => {
    getAllBeaches()
  }, [])

  // fetch all beaches from database
  const getAllBeaches = () => {
    axios.get(process.env.API_BASE_URL + 'api/v1/beach/allbeaches')
    .then(response => {
      setBeachArray(response.data.beaches.map(data => data))
    })
    .catch(error => {
      if (error) console.error(error)
    })
  }

  // fetch all beaches when a governorate is selected and set the governorateArray state to result
  const getGovernorateBeaches = () => {
    axios.get(process.env.API_BASE_URL + 'api/v1/beach/allbeaches')
    .then(response => {
      const beaches = []
      response.data.beaches.map(
        data => data.governorate.toLowerCase() === locationName.toLowerCase()
         ?
         // beach is an array of objects and each object is the beach data
         beaches.push(data)
         :
         null
    )
      setGovernorateArray(beaches)
    })
    .catch(error => {
      if (error) console.error(error)
    })
  }

  // get all favorite beaches
  useEffect(() => {
    allPinnedBeaches()
  },[])

  const allPinnedBeaches = () => {
    if (checkLogin()) {
      const token = localStorage.getItem('accessToken');
      const decoded = jwt_decode(token);
      const userId = decoded['id'];
    axios.get(process.env.API_BASE_URL + `api/v1/user/allpinnedbeaches/${userId}`)
    .then(response => {
      
      setPinnedArray(response.data.beaches.map(b => [b.beach_id]))
     
    })
    .catch(error => { console.error(error)
    })
    }
    else {
      return
    }
    
  }


  // Create cards for pinned beaches
  const getAllPinned = () => {
    const pinned = []
    if (pinnedArray) {
        pinnedArray.map(beach => beach.map(b => 
        beachArray.map( beaches => beaches.id === b
           ?
           pinned.push(
            <li key={uuidv4()}>
              <FavoriteCard
              id={beaches.id}
              key={beaches.id}
              beachName={beaches.name}
              beachData={beaches}
              governorateArray={governorateArray}
            />
            </li>
            
          )
          : null 
           
        )
        ))

    }
        return pinned
    
  }

  return (
    <>
    <div className="hero-section">
      
      <Header token={token}/>
      <h2 className="header-text">Find your perfect beach</h2>
      <Container className="content" style={divStyle}>
      <div className="searchbox-row">
              <div className="searchbox-row">
                  <div className="form-group col-md-4">
                  <label className="label mb-2 fw-bold">Governorate</label>
                  <select id='select' name="location" className="form-control" onClick={locationName? getGovernorateBeaches : null} onChange={Handlelocation} value={locationName}>
                    <option hidden>----- Select Governorate -----</option>
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Nabeul</option>
                    <option>Sousse</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="label mb-2 fw-bold">Beach</label>
                <select id ='select' name="beach" className="form-control" onChange={Handlebeach} value={beachName}>
                    <option hidden>----- Select Beach -----</option>
                    {
                      governorateArray.map(beach => <option key={beach.id}>{beach.name}</option>)
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" className="submit-btn btn btn-success mt-2" style={btnStyle} onClick={handleSubmit}>Submit</button>               
              </div>
        </div>
      </div>
      <div>
      
    </div>
      </Container>
      

      {pinnedArray.length && !result && !results
       ?
        <div className="arrow">
          <p className="arrow-icon-text">Check your pinned beaches</p>
          <button onClick={() => {ref.current?.scrollIntoView({behavior: "smooth"});}}>
            <img className="arrow-icon" src={require('../../../Assets/Images/arrow.png')} alt=""></img>
          </button>
        </div>
       : 
        null
      }
        
    </div>
    <div ref={ref}></div>
    { 
    result || results ?
    <div ref={ref} className="beachResults">
      <BeachResults
        governorateArray={governorateArray}
        pinnedArray={pinnedArray}
        locationName={locationName}
        beachName={beachName}
        result={result}
        results={results}
      />

    </div>
    :
    checkLogin() &&
      <div ref={ref} className="pinned-section">
      {
        pinnedArray.length
          ?
          <>
          {pinnedArray.length > 1 ? <p className="pin-text">Your pinned beaches</p> : <p className="pin-text">Your pinned beach </p>}
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {getAllPinned()}
            </ul>
          </>
          : null
      }  
      </div>
    
}
  </>
  );
}

const divStyle = {
  paddingBottom: '4rem'
};
const btnStyle = {
  backgroundColor: '#198754',
}

export default SearchBox;
