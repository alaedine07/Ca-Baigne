import React, { useState, useEffect, useReducer } from "react";

import { v4 as uuidv4 } from "uuid";
import Box from '@mui/material/Box';
import ReactStars from "react-rating-stars-component";
import Modal from '@mui/material/Modal';
import Posts from "./ModalPosts/Posts";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import './Modal.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'flex',
};

export default function BasicModal(props) {
  
  const [rate, setRate]= useState();
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState('');
  const [postArray, setPostArray] = useState([])
  // set the id for the specefic beach
  const [id, setId]= useState("");
  const [reducedValue, forceUpdate] = useReducer(x => x + 1, 0);
  const [count, setCounter] = useState(0);
<<<<<<< HEAD
  
=======
>>>>>>> e1b40d7e3ebe59ebe78a96828cfeaeafa4edcde6


  useEffect(()=> {
    getBeach()
  },[])

  useEffect(() => {
    getAllPosts()
  }, [id])

  useEffect(()=> {
    getAllPosts()
  },[reducedValue])

  useEffect(()=> {
		getAllPosts()
<<<<<<< HEAD
	},[count])

=======
	  },[count])
>>>>>>> e1b40d7e3ebe59ebe78a96828cfeaeafa4edcde6

  const ratingChanged = (newRating) => {
    setRate(newRating)
  };

  // retrieve the specefic beach by it's name
  const getBeach = () => {
    if (props.beachName) {
      axios.get(process.env.API_BASE_URL + 'api/v1/beach/allbeaches')
        .then(response => {
          response.data.beaches.map( data =>
            data.name === props.beachName ? setId(data.id) : null
          )
        })
        .catch(error => {
          if (error) console.log(error)
        })
    }
  }

  const addPost = () => {
    const token = localStorage.getItem('accessToken');
    const decoded = jwt_decode(token);
    const userId = decoded['id'];
    axios.post(process.env.API_BASE_URL + 'api/v1/post/newpost', {
      content: content,
      beachId: id,
      userId: userId,
    },
    {
      headers: {
        "Content-type": "application/json"
      }
    }
    ).then(() => {
      forceUpdate()
    }).catch(function (error) {
      // shoud return error 500
      if (error.response) {
        console.log(error.response.data)
      }
    })
  }

  const hndleSubmit = (event) => {
    event.preventDefault()
    addPost(event)
    setContent('')
  }

  // extract posts related to the selected beach
  const getAllPosts = () => {
    axios.get(process.env.API_BASE_URL + 'api/v1/post/allposts')
    .then(response => {
      const Posts = []
      response.data.posts.map( data => 
        data.beachId === id ?
        Posts.push(data)
        : 
        null
      )
      setPostArray(Posts)
    })
    .catch(error => {
      // change to display a 500 error
      if (error) console.log(error)
    })
  }

  const deletePost = () => {
<<<<<<< HEAD
    axios.delete(`http://localhost:3001/api/v1/post/deletepost/${postId}`).then(() => {
      forceCounter()
    }).catch(error => console.log(error))
  }
=======
    axios.delete(process.env.API_BASE_URL + `api/v1/post/deletepost/${postId}`).then(() => {
    })
    .catch(error => console.log(error))
}
>>>>>>> e1b40d7e3ebe59ebe78a96828cfeaeafa4edcde6

  return (
    
    <Modal
          open={props.open} 
          onClose={props.handleClose} 
          aria-labelledby="modal-modal-title" 
          aria-describedby="modal-modal-description"
    >
    
    <Box sx={style}>
          <div className='first-half'>
            <img src={props.image} className='modal-img'></img>
            <div className='beach-name'>
              <div>{props.beachName}</div>
              <div><span>4.5</span> <i className="star fas fa-star"></i></div>
            </div>
          </div>
        
        <div className='second-half'>
            <div className='top-header'>
              <div>
                <p className='title-header'> Rate your visite</p>
              </div>
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
            <div className="reviews">
              <Posts
                postArray={postArray}
                setPostId={setPostId}
                deletePost={deletePost}
                getAllPosts={getAllPosts}
                setCounter={setCounter}
                count={count}
<<<<<<< HEAD
=======

>>>>>>> e1b40d7e3ebe59ebe78a96828cfeaeafa4edcde6
              />
            </div>

              <form className="review-form">
                <div className='review'>
                  <input
                  type="text"
                  name='content'
                  onChange={(event) => setContent(event.target.value)}
                  value={content}
                  className='review-input'
                  placeholder='Give us your review' ></input>
                  <button
                  type='submit'
                  className='review-btn btn btn-dark'
                  onClick={hndleSubmit}
                  >Post</button>
                  </div>
              </form>
            </div>  
        </Box>
    
    </Modal>
  );
}
