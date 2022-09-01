import React, { useState, useEffect, useReducer } from "react";

import Box from '@mui/material/Box';
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import './Modal.css';
import moment from 'moment';

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
  borderRadius: '10px'
};



export default function BasicModal(props) {
  const [postId, setPostId] = useState('');
  const [rate, setRate]= useState();
  const [reducedValue, forceUpdate] = useReducer(x => x + 1, 1);

  const ratingChanged = (newRating) => {
    setRate(newRating)
  };

  const deletePost = () => {
    axios.delete(`http://localhost:3001/api/v1/post/deletepost/${postId}`)
    .then(console.log(`post with id ${postId} has been deleted`))
    .catch(error => console.log(error))
  }

  /*useEffect(() => {
    props.getAllPosts()
  }, [reducedValue])*/

  const handleDelete = () => {
    forceUpdate()
    deletePost()
    forceUpdate()
  }

  return (
        <Box sx={style}>
          <div className='first-half'>
          <img src={props.image} className='modal-img'></img>
        <div className='beach-name'>
          <div>{props.name}</div>
          <div><span>4.5</span> <i className="star fas fa-star"></i></div>
          
        </div>
          
          </div>
        
        <div className='second-half'>
            <div className='top-header'>
            <div><p className='title-header'> Rate your visite</p></div>
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
            <div className="posts">
              {
                props.postArray
                  ? 
                  <ul className="posts-list">
                    {props.postArray.map(post =>
                      <li onMouseOver={() => { setPostId(post.id)}} className="posts-item" >
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                          <i class="fas fa-user-circle"></i>
                          <p>{post.content}</p>
                          </div>
                          <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        </div>
                        <p className="time">
                          {moment(post.createdAt).startOf('seconds').fromNow()}
                        </p>
                      </li>
                    )}
                  </ul>
                  : 
                  null
              }
            </div>

              <form className="post-form">
              <div className='post'>
              <input
                type="text"
                name='content'
                onChange={(event) => props.setContent(event.target.value)}
                value={props.content}
                className='post-input'
                placeholder='Give us your review' ></input>
                <button
                type='submit'
                className='post-btn btn btn-dark'
                onClick={props.hndleSubmit}
                >Post</button>
                </div>
              </form>
            </div>
        
          
        </Box>
  );
}
