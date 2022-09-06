import React from 'react'
import BeachCard from '../BeachCard/BeachCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade} from 'swiper';
import { v4 as uuidv4 } from "uuid";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

function BeachResults(props) {

  const getAllResults = () => {
    const results = []
    if (props.beachArray) {
      props.beachArray.map( beaches => {
        beaches.map(beach => {
        results.push(
        <SwiperSlide> 
          <BeachCard 
            beach_id={beach.id} 
            key={uuidv4()} 
            beachName={beach.name}
            beachData={beach}
          />
        </SwiperSlide>
        )
        })})
    }
    return results
  }
  
  function getBeach() {
    for (let i = 0; i < props.beachArray.length; i++) {
      if (props.beachArray[i][0].name === props.beachName) {
        return props.beachArray[0];
      }
    }
    return null;
  }
  

  return (
    <div>
        {
        props.result ?
        <>
        <h3 className="result-text">Your search results for {props.beachName}</h3>
        <div className="results-container d-flex justify-content-center">
          <BeachCard
          beachName={props.beachName}
          beachData={getBeach()[0]}
          />
        </div>
        </>
         : 
        null
      }
      { 
        props.results ?
        <>
        <h3 className="result-text">Your search results for {props.locationName}</h3>
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