import React from 'react';
import BeachCard from '../BeachCard/BeachCard'
import { v4 as uuidv4 } from "uuid";
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
      props.governorateArray.map( beach => {
        results.push(
        <SwiperSlide key={uuidv4()}> 
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
        <p className="result-text">Your search results for “{props.beachName}”</p>
        <div className='results-container d-flex justify-content-center'>
        
        <div className="results-cards ">
          <BeachCard
          id = {getBeach().id}
          beachName={props.beachName}
          governorateArray={props.governorateArray}
          beachData={getBeach()}
          pinnedArray={props.pinnedArray}
          />
        </div>
          <div className="mapouter">
          <div className="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${props.beachName}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
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
              breakpoints={{
                300: {
                  // width: 450,
                  slidesPerView: 1,
                },
                400: {
                  // width: 450,
                  slidesPerView: 1,
                },
                576: {
                  // width: 576,
                  slidesPerView: 1,
                },
                768: {
                  // width: 768,
                  slidesPerView: 2,
                },
              }}
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