import React, { useState, useEffect, useReducer } from "react";

import axios from "axios";
import Modal from '@mui/material/Modal';
import { Container } from "react-bootstrap";
import './SearchBox.css'
import BeachCard from "../BeachCard/BeachCard";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import marsaImg from '../../Assets/Images/marsa.jpg';
import BeachCardModal from '../BeachCard/BeachCardModal';

function SearchBox() {

  const [locationName, setLocation]= useState();
  const [beachName, setBeach] = useState();
  const [result, setResult] = useState(false);
  const [results, setResults] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId]= useState("");
  const [content, setContent] = useState("");
  const [postArray, setPostArray] = useState([]);
  const [reducedValue, forceUpdate] = useReducer(x => x + 1, 1);

  const Handleresults = () => {
    setResult(false)
    setResults(false)
    setBeach('')
  }

/********************/

  const Handlelocation = (event) => {
    Handleresults()
    let getLocation = event.target.value;
    setLocation(getLocation);
  }

/********************/

    useEffect(() => {
      getallBeaches();
    });

    const getallBeaches = () => {
      axios.get('http://localhost:3001/api/v1/beach/allbeaches')
      .then(response => {
        const beaches = []
        response.data.beaches.map(
          data => data.location === locationName
           ?
           beaches.push([{
            name: data.name ,
            id: data.id ,
            location: data.location ,
            option: <option key={uuidv4()}>{data.name}</option> ,
            latitude: data.latitude ,
            longitude: data.longitude ,
            description: data.description ,
      }])
           :
           null
      )
        setMyArray(beaches)
      })
      .catch(error => {
        if (error) console.log(error)
      })
    }

/********************/

    const Handlebeach = (event) => {
    let getBeach = event.target.value;
    setBeach(getBeach);
    event.preventDefault();
  }

/********************/

  const handleSubmit = () => {
    if (locationName) {
      setResult(false)
      setResults(true)
    }
    if (beachName) {
      setResults(false)
      setResult(true)
    }
  }

/********************/

  const getAllResults = () => {
    const results = []
    if (myArray) {
      myArray.map( beaches => {
        beaches.map(beach => {
        beach.location === locationName
        ?
        results.push(<SwiperSlide> <BeachCard key={uuidv4()} name={beach.name} description={beach.description} handleOpen={handleOpen}/></SwiperSlide>)
        :
        '' 
        })})
    }
    return results
  }
/***********************/


  
/********************/

useEffect(()=> {
  getBeach()
})

const getBeach = () => {
  if (beachName) {
    axios.get('http://localhost:3001/api/v1/beach/allbeaches')
      .then(response => {
        response.data.beaches.map( data =>
          data.name === beachName ? setId(data.id) : null
        )
      })
      .catch(error => {
        if (error) console.log(error)
      })
  }
  
}

const addPost = () => {
  
  axios.post('http://localhost:3001/api/v1/post/newpost', {
    content: content,
    beachId: id
  },
  {
    headers: {
      "Content-type": "application/json"
    }
  }
  ).then(() => console.log('post added'))
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data)
    }
  })
}
 
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/post/allposts')
  .then(response => {
    const Posts = []
    response.data.posts.map( data => 
      data.beachId === id ? Posts.push({id: data.id , content: data.content, createdAt: data.createdAt}) : null
    )
    setPostArray(Posts)
    console.log("here's your posts")
  })
  .catch(error => {
    if (error) console.log(error)
  })}, [])

  /*const getAllPosts = () => {
    axios.get('http://localhost:3001/api/v1/post/allposts')
    .then(response => {
      const Posts = []
      response.data.posts.map( data => 
        data.beachId === id ? Posts.push({id: data.id , content: data.content, createdAt: data.createdAt}) : null
      )
      setPostArray(Posts)
      console.log("here's your posts")
    })
    .catch(error => {
      if (error) console.log(error)
    })
    
  }*/


const hndleSubmit = (event) => {
  event.preventDefault()
  addPost(event)
  setContent('')
  forceUpdate()
}

/***********************/


const handleClick = () => {
  handleOpen()
  forceUpdate()
}

/**********************/
  return (
    <>
      <h2 className="header-text">Time to swim </h2>
      <Container className="content" style={divStyle}>
      <div className="row justify-content-center ">
        <div className="">
              <div className="row mb-3 align-items-end">
                  <div className="form-group col-md-4">
                  <label className="label mb-2 fw-bold text-black">Location</label>
                  <select id='select' name="location" className="form-control" onClick={locationName? getallBeaches : null} onChange={Handlelocation} value={locationName}>
                    <option hidden>--Select Location--</option>
                    <option>Tunis</option>
                    <option>Bizerte</option>
                    <option>Nabeul</option>
                    <option>Sousse</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                <label className="label mb-2 fw-bold text-black">Beach</label>
                <select id ='select' name="beach" className="form-control" onChange={Handlebeach} value={beachName}>
                    <option hidden>--Select Beach--</option>
                    {
                      myArray.map(beaches => beaches.map(beach => beach.option))
                    }
                </select>
                </div>

                <div className="form-group col-md-2 mt-4">              
                <button type="submit" className="btn btn-success mt-2" style={btnStyle} onClick={handleSubmit}>Submit</button>               
                </div>
              </div>
        </div>
      </div>
      <div>
      
    </div>
      </Container>
      {
        open ?

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <BeachCardModal image={marsaImg} name={beachName} postArray={postArray} content={content} 
        setContent={setContent} hndleSubmit={hndleSubmit} /*getAllPosts={getAllPosts}*/
        />
        </Modal>
        :
        ''
      }

      {
        result ?
        <>
        <h3 className="result-text">Your search results for {beachName}</h3>
        <div className="results-container d-flex justify-content-center">
          <BeachCard
          handleClick={handleClick}
          name={beachName}
          description={myArray.map(beaches => beaches.map(
            beach =>
            beach.name === beachName
            ?
            beach.description
            :
            ''
            ))}/>
        </div>
        </>
         : 
        null
      }
      { 
        results ?
        <>
        <h3 className="result-text">Your search results for {locationName}</h3>
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
    
    </>
  );
}

const divStyle = {
  paddingBottom: '4rem'
};
const btnStyle = {
  backgroundColor: '#198754'
}

export default SearchBox;