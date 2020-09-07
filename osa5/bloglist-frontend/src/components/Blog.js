import React, { useState } from 'react'
const Blog = ({ blog, handleLike, deleteBlog }) => {
	const [detail, setDetail] = useState(false)

	const toggleDetail = () => setDetail(!detail)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const likeBlog = () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id
		}
		handleLike(updatedBlog)
	}

	const removeBlog = () => {
		if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			deleteBlog(blog.id)
		}
	}

	const ViewButton = () => {
		return (
			<button onClick={toggleDetail} className='detailButton'>{detail ? 'hide' : 'view'}</button>
		)
	}

	const Detail = () => {
		return (
			<div className='details'>
				<div>{blog.url}</div>
				<div>
					{blog.likes}
					<button onClick={likeBlog} className='likeButton'>like</button>
				</div>
				<div>{blog.user.username}</div>
				<div>
					{deleteBlog === null ? '' : <button onClick={removeBlog}>remove</button>}
				</div>
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author} {ViewButton()}
			{detail ? Detail() : ''}
		</div>
	)
}

export default Blog
