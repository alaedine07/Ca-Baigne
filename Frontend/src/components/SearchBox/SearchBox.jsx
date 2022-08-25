import React, { useState } from "react";

import { Container } from "react-bootstrap";
import './SearchBox.css'
import BeachCard from "../BeachCard/BeachCard";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


const Locations = [
  { id: 84 , name: 'Tunis', beaches: ['Marsa', 'Gammarth']},
  { id: 456 , name: 'Bizerte', beaches: ['Ghar el Melah', 'Rafraf']},
  { id: 16 , name: 'Hammamet', beaches: ['les citronniers', 'les 3 oueds']},
  { id: 855 , name: 'Sousse', beaches: ['Chat Mariem']},
  { id: 17 , name: 'Mahdia', beaches: ['Salakta']},
  { id: 36 , name: 'Djerba', beaches: ['El Seguia', 'Sidi yeti']},
]

function SearchBox() {
  const [locationName, setLocation]= useState();
  const [beachName, setBeach] = useState();
  const [result, setResult] = useState(false);
  const [results, setResults] = useState(false);

  const Handleresults = () => {
    setResult(false)
    setResults(false)
    setBeach('')
  }

  const Handlelocation = (event) => {
    Handleresults()
    let getLocation = event.target.value;
    setLocation(getLocation);
    console.log(locationName)

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
        for (let i = 0; i < beach.beaches.length; i++) {
          results.push(<SwiperSlide><BeachCard key={uuidv4()} name={beach.beaches[i]} /></SwiperSlide>)
        }}})
    return results
  }

  return (
    <>
      <h2 className="header-text">Time to swim </h2>
      <Container className="content" style={divStyle}>
      <div className="row justify-content-center ">
        <div className="">
              <div className="row mb-3 align-items-end">
                  <div className="form-group col-md-4">
                  <label className="mb-2 fw-bold text-black">Location</label>
                  <select id='location' name="location" className="form-control" onChange={Handlelocation} value={locationName}>
                    <option hidden>--Select Location--</option>
                    {
                      Locations.map( (loc) => ( 
                        <option key={uuidv4()} value={loc.name}>{loc.name}</option>))
                    }
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="mb-2 fw-bold text-black">Beach</label>
                <select id ='beach' name="beach" className="form-control" onChange={Handlebeach} value={beachName}>
                    <option hidden>--Select Beach--</option>
                    {
                      Locations.map( (loc) => (
                      loc.name === locationName ? loc.beaches.map(beach => <option key={uuidv4()} value={beach} >{beach}</option>)
                      : ''
                    ))
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" className="btn btn-success mt-2" style={btnStyle} onClick={handleSubmit}>Submit</button>               
                </div>
              </div>
        </div>
      </div>
      </Container>
      
      {
        result ?
        <>
        <h3 className="result-text">Your search results for {beachName}</h3>
        <div className="results-container d-flex justify-content-center">
          <BeachCard name={beachName}/>
        </div>
        </>
         : 
        null
      }
      { 
        results ?
        <>
        <h3 className="result-text">Your search results for {locationName}</h3>
        <div className='swiper-container'>
        <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        effect
        speed={800}
        slidesPerView={1}
        loop
        className='myswiper'
        >
          {getAllResults()}
                
        </Swiper>

    </div>
        </>
        :
        null
      }
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