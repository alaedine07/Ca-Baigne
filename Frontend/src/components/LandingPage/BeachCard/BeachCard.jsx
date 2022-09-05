import React, {useState, useReducer} from 'react'
import { v4 as uuidv4 } from "uuid";
import ReactStars from "react-rating-stars-component";
import './BeachCard.css'
import BasicModal from './Modal/BeachCardModal';
import getbeachState from '../../../Utils/WindyApiCall';

function BeachCard(props) {
  
  const [rate, setRate]= useState();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [beachState, setBeachState] = useState('');
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [reducedValue, forceUpdate] = useReducer(x => x + 1, 0);

  const ratingChanged = (newRating) => {
    setRate(newRating)
  };


  const handleClick = () => {
    handleOpen()
  }

  function getAmenities() {
    let amenities = "";
    for (const [key, value] of Object.entries(props.beachData.amenities)) {
      amenities += value + " * "
    }
    return amenities;
  }

  function checkLogin() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
  }

  async function getFlag(la, lo) {
    const flag = await getbeachState(la, lo);
    setBeachState(flag);
  }



  return (
    <>
    <div id={props.id} className='f p-5' >
      <div className="card bg-dark text-white" >
        {checkLogin() && 
        <>
          <button className='pin' onClick={() => setIcon(0 + 1)}>
            { icon ? <i className="fas fa-heart"></i> :
            <i className="far fa-heart"></i> }
          </button>
        </>  
        }
        <div className='overflow'>
          <img className="card-img-top" src={'http://localhost:3001/' + props.beachData.imagepath.split('/').slice(-3).join('/')} alt="Card image cap" onClick={checkLogin() && handleClick} />
        </div>
        <div className="card-body">
          <h5 className="card-title text-info">{props.beachName}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Weather: 30c°</li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Beach state: {getFlag(props.beachData.latitude, props.beachData.longitude) && beachState === "green" ? <i className="green-flag fas fa-solid fa-flag"></i> : beachState === "orange" ? <i className="orange-flag fas fa-solid fa-flag"></i> : <i className="red-flag fas fa-solid fa-flag"></i>}</li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">facilities: {getAmenities()}</li>
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

export default BeachCard
