import React from 'react'
import marsaImg from '../Assets/marsa.jpg'
import gammarthImg from '../Assets/gammarth.jpg'

const BeachesInfo = [
    { name: 'Marsa', description: 'The beach of La Marsa, a small respectable resort near the capital, is located on the Gulf of Tunis between the beaches of Sidi Bou Said and Gammarth.', image: marsaImg  },
    { name: 'Gammarth', description: 'The beach of Gammarth, a small respectable resort near the capital, is located on the Gulf of Tunis between the beaches of Sidi Bou Said and Gammarth.', image: marsaImg  },
]
const BeachesImg = [
    { name: 'Gammarth', image: gammarthImg },
    {name: 'Marsa', image: marsaImg}
]
function BeachCard(props) {
    const getImage = () => {
        for (let i = 0; i < BeachesImg.length; i++) {
            if (BeachesImg[i].name === props.name)
            {
                console.log("got a match");
                return BeachesImg[i].image
            }
        }
        return null
    }
  return (
    <div className='p-5'>
      <div className="card" style={divStyle}>
      <img className="card-img-top" src={getImage()} 
                   alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{
                     BeachesInfo.map( beach => (
                        beach.name === props.name ?
                    beach.description : null
                   ))}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Weather: 30c°</li>
        <li className="list-group-item">Beach state: white flag</li>
        <li className="list-group-item">Amenities: ****</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">Card link</a>
        <a href="#" className="card-link">Another link</a>
      </div>
    </div>
   </div>
  )
}
const divStyle = {
    width: '18rem'
};
export default BeachCard