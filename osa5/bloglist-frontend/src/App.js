import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCreateForm from './components/BlogCreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [noteMessage, setNoteMessage] = useState({ className: null, message: null })
	const blogCreateFormRef = React.createRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
		const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async credentials => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			setUser(user)
			blogService.setToken(user.token)
			setNoteMessage({ className: 'note', message: `${user.name} logged in` })
			setTimeout(() => {
				setNoteMessage({ className: null, message: null })
			}, 5000)
		} catch (error) {
			setNoteMessage({ className: 'error', message: error.response.data.error })
			setTimeout(() => {
				setNoteMessage({ className: null, message: null })
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
		setNoteMessage({ className: 'error', message: 'Logged out' })
		setTimeout(() => {
			setNoteMessage({ className: null, message: null })
		}, 5000)
	}

	const handleCreate = async newBlog => {
		blogCreateFormRef.current.toggleVisibility()
		try {
			const blog = await blogService.create(newBlog)
			setBlogs(blogs.concat(blog))
			setNoteMessage({ className: 'note', message: `a new blog ${blog.title} by ${blog.author} added` })
			setTimeout(() => {
				setNoteMessage({ className: null, message: null })
			}, 5000)
		} catch (error) {
			console.log(error)
			setNoteMessage({ className: 'error', message: error })
			setTimeout(() => {
				setNoteMessage({ className: null, message: null })
			}, 5000)
		}
	}

	const handleRemove = async id => {
		try {
			await blogService.remove(id)
			setBlogs(blogs.filter(blog => blog.id !== id))
		} catch (error) {
			console.log(error)
		}
	}

	const handleLike = async updatedBlog => {
		try {
			const returnedBlog = await blogService.update(updatedBlog, updatedBlog.id)
			setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : returnedBlog))
		} catch (error) {
			console.log(error)
		}
	}

	const BlogForm = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{`${user.name} logged in`}
					<button onClick={() => handleLogout()}>logout</button>
				</p>
				<Togglable buttonLabel="new blog" ref={blogCreateFormRef}>
					<BlogCreateForm create={handleCreate} />
				</Togglable>
				{blogs
					.sort((a, b) => b.likes - a.likes)
					.map(blog => {
						return (
							<Blog
								key={blog.id} blog={blog}
								handleLike={handleLike}
								deleteBlog={blog.user.username === user.username ? handleRemove : null}
							/>
						)
					})
				}
			</div>
		)
	}

	return (
		<div>
			<Notification message={noteMessage} />
			{user ?
				BlogForm()
				:
				<LoginForm login={handleLogin} />
			}

		</div>
	)
}

export default App