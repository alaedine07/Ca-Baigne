import React from 'react';

import moment from 'moment';

function Posts(props) {

	const handleDelete = () => {
		props.deletePost()
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
	)
}

export default Posts