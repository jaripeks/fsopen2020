import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('at start', () => {
	const blog = {
		title: 'Testiblogi',
		author: 'Testikirjoittaja',
		likes: 6,
		url: 'http://testi.com'
	}

	let component

	beforeEach(() => {
		component = render(<Blog blog={blog} />)
	})

	test('renders the title and the author', () => {
		expect(component.container).toHaveTextContent(
			'Testiblogi'
		)
		expect(component.container).toHaveTextContent(
			'Testikirjoittaja'
		)
	})

	test('does not render likes or url', () => {
		expect(component.container).not.toHaveTextContent(
			'6'
		)
		expect(component.container).not.toHaveTextContent(
			'http://testi.com'
		)
	})
})

describe('after clicking show', () => {
	const blog = {
		title: 'Testiblogi',
		author: 'Testikirjoittaja',
		likes: 6,
		url: 'http://testi.com',
		user: {
			username: 'Testilisääjä'
		}
	}

	const like = jest.fn()

	let component

	beforeEach(() => {
		component = render(<Blog blog={blog} handleLike={like} />)
	})

	test('url and likes are shown', () => {
		const button = component.container.querySelector('.detailButton')
		fireEvent.click(button)

		const div = component.container.querySelector('.details')
		expect(div).toBeDefined()

		expect(div).toHaveTextContent(
			'6'
		)
		expect(div).toHaveTextContent(
			'http://testi.com'
		)
	})

	test('and pressing like twice, like is called two times', () => {
		let button = component.container.querySelector('.detailButton')
		fireEvent.click(button)

		button = component.container.querySelector('.likeButton')
		fireEvent.click(button)
		fireEvent.click(button)

		expect(like.mock.calls).toHaveLength(2)
	})
})