import React from 'react'
import marsaImg from '../../Assets/Images/marsa.jpg'
import gammarthImg from '../../Assets/Images/gammarth.jpg'


const BeachesInfo = [
    { name: 'Marsa', description: 'The beach of La Marsa, a small respectable resort near the capital, is located on the Gulf of Tunis between the beaches of Sidi Bou Said and Gammarth.'},
    { name: 'Gammarth', description: 'The beaches of Gammarth, a famous respectable resort in the suburbs of the capital of Tunisia, about 10 km long, are located along the northern coast of the Mediterranean Sea.'},
]
const BeachesImg = [
    { name: 'Gammarth', image: gammarthImg },
    { name: 'Marsa', image: marsaImg },

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
    <div className='p-5 d-flex align-self-stretch justify-content-center'>
      <div className="card bg-dark text-white" style={divStyle}>
      <img className="card-img-top" src={getImage()} style={imgStyle} 
                   alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title text-info">{props.name}</h5>
        <p className="card-text">{
                     BeachesInfo.map( beach => (
                        beach.name === props.name ?
                    beach.description : null
                   ))}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-secondary text-white">Weather: 30c°</li>
        <li className="list-group-item bg-secondary text-white">Beach state: white flag <i className="fas fa-solid fa-flag text-white"></i></li>
        <li className="list-group-item bg-secondary text-white">Amenities: ****</li>
      </ul>
    </div>
   </div>
  )
}
const divStyle = {
    width: '18rem'
};
const imgStyle = {
    width: '100%',
    height: '15vw',
    objectFit: 'cover',
}
export default BeachCard