import React, {useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import ReactStars from "react-rating-stars-component";
import marsaImg from '../../Assets/Images/marsa.jpg';
import gammarthImg from '../../Assets/Images/gammarth.jpg';
import gharImg from '../../Assets/Images/gharelmelh.jpg';
import ainmestirImg from '../../Assets/Images/ainmestir.jpg';
import boujaafarImg from '../../Assets/Images/boujaafar.jpg';
import cocoImg from '../../Assets/Images/coucoubeach.jpg';
import './BeachCard.css'

const BeachesImg = [
  { name: 'Gammarth Beach', image: "../../Assets/Images/gammarth.jpg" },
  { name: 'Marsa Beach', image: marsaImg },
  { name: 'Ghar El Melh Beach', image: gharImg },
  { name: 'Ain Mestir Beach', image: ainmestirImg },
  { name: 'Bou Jaafar Beach', image: boujaafarImg },
  { name: 'Coco Beach utique', image: cocoImg },

]



function BeachCard(props) {
  const [rate, setRate]= useState();

    const getImage = () => {
        for (let i = 0; i < BeachesImg.length; i++) {
            if (BeachesImg[i].name === props.name)
            {
                return BeachesImg[i].image
            }
        }
        return null
    }

    const ratingChanged = (newRating) => {
      setRate(newRating)
    };

  return (
    <div className='f p-5' >
      <div className="card bg-dark text-white" >
        <button className='pin'><i className="far fa-heart"></i></button>
        <div className='overflow'>
          <img className="card-img-top" src={getImage()} alt="Card image cap" onClick={props.handleClick}/>
        </div>
        
        <div className="card-body">
          <h5 className="card-title text-info">{props.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Weather: 30c°</li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Beach state: white flag <i className="fas fa-solid fa-flag text-white"></i></li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">{props.description}</li>
        </ul>
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
        
      </div>
   </div>
  )
}
const starStyle = {
  paddingLeft: '5px !important'
}
export default BeachCard
