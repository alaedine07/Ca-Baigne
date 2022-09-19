import React, {useState} from 'react'
import BeachCard from '../BeachCard/BeachCard'
import CarouseCard from '../BeachCard/CarouselCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade} from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

function BeachResults(props) {

  // get all the beaches related to a selected gouvernorate
  const getAllResults = () => {
    const results = []
    if (props.governorateArray) {
      props.governorateArray.map( beach => {
        results.push(
        <SwiperSlide> 
          <CarouseCard
            beach_id={beach.id} 
            key={beach.id} 
            beachName={beach.name}
            beachData={beach}
          />
        </SwiperSlide>
        )
        })
    }
    return results
  }

  // when user select a specefic beach
  function getBeach() {
    for (let i = 0; i < props.governorateArray.length; i++) {
      if (props.governorateArray[i].name === props.beachName) {
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
        <h3 className="result-text">Your search results for “{props.beachName}”</h3>
        <div className="results-container d-flex justify-content-center">
          <BeachCard
            id = {getBeach().id}
            beachName={props.beachName}
            governorateArray={props.governorateArray}
            beachData={getBeach()}
            pinnedArray={props.pinnedArray}
          />
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
