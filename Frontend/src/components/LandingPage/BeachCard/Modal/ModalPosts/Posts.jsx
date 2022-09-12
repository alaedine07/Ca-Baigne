import React, {useEffect, useState, useReducer} from 'react';

import moment from 'moment';
import jwt_decode from "jwt-decode";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import './Post.css';

function Posts(props) {
	const [open, setOpen] = useState(false);
	const [userName, setUserName] = useState('');
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [count, forceCounter] = useReducer(x => x + 1, 0);


	const handleDelete = () => {
		props.deletePost()
		handleClose()
		forceCounter()
	  }

	  useEffect(()=> {
		props.getAllPosts()
	  },[count])


	// security risk here
	function checkLogin(postUserId) {
		const token = localStorage.getItem('accessToken');
		const decoded = jwt_decode(token);
        const userId = decoded['id'];
		if (postUserId === userId) {
		  return true;
		}

	}
	// Get username
	useEffect(() => {
		getUserName()
	}, [])

	const getUserName = () => {
		const token = localStorage.getItem('accessToken');
		const decoded = jwt_decode(token);
		const userName = decoded['Username'];
		setUserName(userName.charAt(0).toUpperCase() + userName.slice(1));
	}

	function getUserImage() {
		const token = localStorage.getItem('accessToken');
		const decoded = jwt_decode(token);
        const imagePath = decoded['imagePath'];
		if (imagePath) {
			return imagePath
		}
}
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 500,
		bgcolor: 'background.paper',
		borderTop: '5px solid #f94949',
		boxShadow: 24,
		p: 4,
		fontFamily: 'Amiri'
	};

	return (
	<>
	<div>
		{
			props.postArray
			? 
			<ul className="reviews-list">
				{props.postArray.map(post =>
				<>
				{props.setPostId(post.id)}
				<li /*onMouseOver={() => { props.setPostId(post.id)}}*/ className="reviews-item" key={post.id}>
					<div className='review-container'>
						<div className='review-content'>
							<div className='user-credentials'>
							{
								/*<img className='user-image' src={'http://localhost:3001/' + post.image.split('/').slice(-3).join('/')} alt="img" />*/
							}
								<div className="comment-content">
									<p>{post.userName.charAt(0).toUpperCase() + post.userName.slice(1)}</p>
									<p >“{post.content}”</p>
									<div className='review-time'>
										<p className="time">
											{moment(post.createdAt).startOf('seconds').fromNow()}
										</p>
									</div>
								</div>
							</div>
							<div>
								{ checkLogin(post.userId) &&
									<button className="delete-btn" onClick={handleOpen}>Delete</button>
								}
							</div>
						</div>
						
						
						
					</div>
					
						
				</li>
				</>
				)}
				
			</ul>
			: 
			null
		}
	</div>
	<div>
	<Modal
	  open={open}
	  onClose={() => {handleClose}}
	  aria-labelledby="modal-modal-title"
	  aria-describedby="modal-modal-description"
	>
	  <Box className='alert-modal' sx={style}>
		<div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
			<svg className='danger' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z"/>
			</svg>
			<div>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{userName}, your review will be deleted immediatly. You can't undo this action.
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Are you sure you want to delete your review ?
				</Typography>
				<div>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete}>Yes, Delete it</Button>
				</div>
			</div>
			
		</div>
		
	  </Box>
	</Modal>
  </div>
  </>
	)
}

export default Posts