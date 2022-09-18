import React, {useState, useReducer, useEffect} from 'react'

import { v4 as uuidv4 } from "uuid";
import ReactStars from "react-rating-stars-component";
import BasicModal from './Modal/BeachCardModal';
import axios from "axios";
import getbeachState from '../../../Utils/WindyApiCall';

import './BeachCard.css'

const API_KEY = 'de668cda57d2ffe3f3b8fadc3fdeb118'

function CarouselCard(props) {
  
  const [rate, setRate]= useState();
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [beachState, setBeachState] = useState('');


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reducedValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    getWeather(props.beachData.latitude, props.beachData.longitude)
  },[])

  const getWeather = (lat, long) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(response => {
        const { main, weather } = response.data;
        setWeatherIcon(`http://openweathermap.org/img/w/${
          weather[0]["icon"]}.png`)
          setWeather(main.temp.toFixed())
          setWeatherDescription(weather[0].description)
    })
    .catch(error => console.log(error))

}

  async function getFlag(la, lo) {
    const flag = await getbeachState(la, lo);
    setBeachState(flag);
  }


  const ratingChanged = (newRating) => {
    setRate(newRating)
  };


  const handleClick = () => {
    handleOpen()
  }

  function getAmenities() {
    let amenities = [];
    for (const [key, value] of Object.entries(props.beachData.amenities)) {
      amenities.push(<li key={uuidv4()}>{value}</li>)
    }
    return amenities;
  }

  function checkLogin() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
    return false
  }
  return (
    <>
          <div  className='f p-5' >
            <div className="beach-card card text-white" >
            <div className='overflow'>
              <img className="card-img-top" src={'http://localhost:3001/' + props.beachData.imagepath.split('/').slice(-3).join('/')} alt="Card image cap"  />
              <div className="image-button">
              {
                  checkLogin()
                   ?
                   <a onClick={handleClick} href="#"> Check reviews </a>
                   :
                   <a href="/login"> Check reviews </a>
                }
                </div>
            </div>
            <div className="card-body">
              <div className="card-title">
                <h5 >{props.beachName}</h5>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li key={uuidv4()} className="weather-data list-group-item text-dark">
              <span className='card-list-title'>Current weather :</span>
                <div style={{display: 'flex', alignItems: 'center'}}>
                
                {weather} <sup>°C</sup>
                <img className="weather-icon" src={weatherIcon} /> 
                </div>
                <p>{weatherDescription}</p>
                </li>
                <li key={uuidv4()} className="list-group-item text-dark"><span className='card-list-title'>Beach state :</span> {getFlag(props.beachData.latitude, props.beachData.longitude) && beachState === "green"
            ?
            <> 
              <i className="green-flag fas fa-solid fa-flag"> Green flag</i>
              <p>Low hazard ~ Calm conditions, exercise caution.</p>
            </>
              : 
            beachState === "orange"
             ?
            <>
              <i className="orange-flag fas fa-solid fa-flag"> Orange flag</i>
              <p style={{color: 'yellow'}}>Medium hazard ~ Ocean conditions are rough (moderate surf and/or currents).</p>
            </>
            : 
            <>
              <i className="red-flag fas fa-solid fa-flag"> Red flag</i>
              <p>High Hazard ~ Rough conditions (strong surf and/or currents) are present.</p>
            </>
          }
          </li>
              <li key={uuidv4()} className="list-group-item text-dark"><span className='card-list-title'>Amenities :</span> <ul>{getAmenities()}</ul></li>
            </ul>
            {checkLogin() &&
            <>
              <div className='stars-div'>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />       
              {
                rate ? <div style={{fontFamily: 'Amiri'}}><p>Your rate ({rate}) has been received</p><p>Thank you !</p></div> : null
              }
            </div>
            </>
            }
            </div>
          </div>
          {
            open ? <BasicModal
            open={open}
            handleClose={handleClose} 
            beachName={props.beachName} 
            image={props.beachData.imagepath}
            reducedValue={reducedValue} 
            forceUpdate={forceUpdate}
            /> : null
          }
        </>
  )
}

export default CarouselCard
