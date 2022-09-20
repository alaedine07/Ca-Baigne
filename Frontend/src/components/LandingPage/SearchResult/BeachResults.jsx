import React from 'react';
import BeachCard from '../BeachCard/BeachCard'
import CarouseCard from '../BeachCard/CarouselCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade} from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../SearchBox/SearchBox.css'

function BeachResults(props) {

  const getAllResults = () => {
    const results = []
    if (props.governorateArray) {
      props.governorateArray.map( beaches => {
        beaches.map(beach => {
        results.push(
          <SwiperSlide>
            <CarouseCard
              beach_id={beach.id} 
              key={beach.id} 
              beachName={beach.name}
              beachData={beach}
              governorateArray={props.governorateArray}
            />
          </SwiperSlide>
        )
        })})
    }
    return results
  }

  function getBeach() {
    for (let i = 0; i < props.governorateArray.length; i++) {
      if (props.governorateArray[i][0].name === props.beachName) {
        
        return props.governorateArray[i];
      }
    }
    return null;
  }

  return (
    <div>
        {
        props.result ?
        <>
          <p className="result-text">Your search results for “{props.beachName}”</p>
          <div className='results-container d-flex justify-content-center'>
          
          <div className="results-cards ">
            <BeachCard
            id = {getBeach()[0].id}
            beachName={props.beachName}
            governorateArray={props.governorateArray}
            beachData={getBeach()[0]}
            pinnedArray={props.pinnedArray}
            />
          </div>
            <div className="mapouter">
            <div className="gmap_canvas" style={{overflow: "hidden", background: 'none !important', height: "500px", width: "600px"}}>
              <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${props.beachName}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                <a href="https://123movies-to.org">123 movies</a>
                  <br/>
                      <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
            </div>
          </div>
          </div>
        </>
         : 
        null
      }
      { 
        props.results ?
        <>
        <h3 className="result-text">Your search results for “{props.locationName}”</h3>
          <div className='swiper-container'>
            <Swiper
              modules={[Navigation, EffectFade]}
              navigation
              effect
              speed={800}
              slidesPerView={2}
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
    </div>
  )
}


export default BeachResults