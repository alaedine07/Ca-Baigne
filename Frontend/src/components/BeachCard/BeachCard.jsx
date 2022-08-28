import React from 'react'
import { v4 as uuidv4 } from "uuid";
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
    const getImage = () => {
        for (let i = 0; i < BeachesImg.length; i++) {
            if (BeachesImg[i].name === props.name)
            {
                return BeachesImg[i].image
            }
        }
        return null
    }
  return (
    <div className='p-5' >
      <div className="card bg-dark text-white" >
        <button className='pin'><i className="far fa-heart"></i></button>
        <div className='overflow'>
          <img className="card-img-top" src={getImage()} alt="Card image cap" />
        </div>
        
        <div className="card-body">
          <h5 className="card-title text-info">{props.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Weather: 30c°</li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">Beach state: white flag <i className="fas fa-solid fa-flag text-white"></i></li>
          <li key={uuidv4()} className="list-group-item bg-secondary text-white">{props.description}</li>
        </ul>
      </div>
   </div>
  )
}

export default BeachCard
