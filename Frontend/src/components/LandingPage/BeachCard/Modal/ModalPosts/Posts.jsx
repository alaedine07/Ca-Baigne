import React from 'react';

import moment from 'moment';
import jwt_decode from "jwt-decode";

import './Post.css';

function Posts(props) {

	console.log("post ", props.postArray);

	const handleDelete = () => {
		props.deletePost()
	}

	// security risk here
	function checkLogin(postUserId) {
		const token = localStorage.getItem('accessToken');
		const decoded = jwt_decode(token);
        const userId = decoded['id'];
		console.log('ids ', userId, postUserId);
		if (postUserId === userId) {
		  return true;
		}
	}

	function getUserImage() {
		const token = localStorage.getItem('accessToken');
		const decoded = jwt_decode(token);
        const imagePath = decoded['imagePath'];
		if (imagePath) {
			return imagePath
		}
	}

	return (
	<div>
		{
			props.postArray
			? 
			<ul className="posts-list">
				{props.postArray.map(post =>
				<li onMouseOver={() => { props.setPostId(post.id)}} className="posts-item" >
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{display: 'flex', alignItems: 'center'}}>
					<img className="commenter-image" src={'http://localhost:3001/' + getUserImage().split('/').slice(-3).join('/')} alt="user-image"></img>
					<p className="comment-content">{post.content}</p>
					</div>
					{ checkLogin(post.userId) &&
						<button className="delete-btn" onClick={handleDelete}>Delete</button>
					}
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
	)
}

export default Posts