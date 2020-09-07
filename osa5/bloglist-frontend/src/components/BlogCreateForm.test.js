import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogCreateForm from './BlogCreateForm'

test('submitting the form calls create with correct parameters', () => {
	const newBlog = {
		title: 'uusiBlogi',
		author: 'uusiAuthor',
		url: 'http://newUrl.new'
	}

	const createBlog = jest.fn()

	const component = render(
		<BlogCreateForm create={createBlog} />
	)

	const titleInput = component.container.querySelector('#title')
	const authorInput = component.container.querySelector('#author')
	const urlInput = component.container.querySelector('#url')

	fireEvent.change(titleInput, {
		target: { value: newBlog.title }
	})
	fireEvent.change(authorInput, {
		target: { value: newBlog.author }
	})
	fireEvent.change(urlInput, {
		target: { value: newBlog.url }
	})

	fireEvent.submit(component.container.querySelector('form'))

	expect(createBlog.mock.calls).toHaveLength(1)

	const createdBlog = createBlog.mock.calls[0][0]
	expect(createdBlog.title).toBe(newBlog.title)
	expect(createdBlog.author).toBe(newBlog.author)
	expect(createdBlog.url).toBe(newBlog.url)
})