describe('Blog app:', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/tests/reset')
		cy.createUser({
			name: 'Testi Mies',
			username: 'tmies',
			password: 'supersekret'
		})
	})

	it('Login form is shown at start', function () {
		cy.contains('log in to application')
	})

	describe('Login ', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('tmies')
			cy.get('#password').type('supersekret')
			cy.get('#login-button').click()
			cy.contains('Testi Mies logged in')

			cy.get('.note')
				.should('contain', 'Testi Mies logged in')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
		})

		it('fails with wrong pw', function () {
			cy.get('#username').type('tmies')
			cy.get('#password').type('sekret')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', 'Testi Mies logged in')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'tmies', password: 'supersekret' })
		})

		it('a blog can be created', function () {

			cy.contains('new blog').click()
			cy.get('#title').type('TestiBlogi')
			cy.get('#author').type('Testimiehen Isä')
			cy.get('#url').type('http://localhost.on/ainoa-url')
			cy.get('#blog-create-button').click()

			cy.get('#bloglist').should('contain', 'TestiBlogi')
		})

		describe('And after a blog is created', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'TestiBlogi Kaksi',
					author: 'Testimiehen Isä',
					url: 'localhosti on ainoa urli, mitä tiedän'
				})
			})

			it('a blog can be liked', function () {
				cy.server()
				cy.route('PUT', '/api/blogs/*').as('blogsPUT')

				cy.get('#detailButton').click()

				for (let i = 0; i < 2; i++) {
					cy.get('#likeButton').click()
					cy.wait('@blogsPUT', { responseTimeout: 5000 })
				}

				cy.get('#likes')
					.should('contain', '2')
			})

			it('a blog can be removed by the user', function () {
				cy.get('#detailButton').click()
				//Cypress will auto accept confirmations (from window.confirm())
				cy.get('#deleteButton').click()
				cy.get('#bloglist')
					.should('not.contain', 'TestiBlogi Kaksi')
			})

			it('a different user cant delete the blog', function () {
				cy.logout()
				cy.createUser({
					name: 'test-boy-89',
					username: 'tboy',
					password: 'justsekret'
				})
				cy.login({ username: 'tboy', password: 'justsekret' })
				cy.get('#detailButton').click()
				cy.get('#details')
					.should('not.contain', '#deleteButton')
			})
		})

		describe('And after multiple blogs are created', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'TestiBlogi Kolme',
					author: 'Testimiehen Isä',
					url: 'localhosti on ainoa urli, mitä tiedän',
					likes: 5
				})

				cy.createBlog({
					title: 'TestiBlogi Neljä',
					author: 'Testimiehen Isä',
					url: 'localhosti on ainoa urli, mitä tiedän',
					likes: 6
				})
			})

			it('blog wiht most likes is displayed at the top', function () {
				cy.get('#blog')
					.should('contain', 'TestiBlogi Neljä')
					.and('not.contain', 'TestiBlogi Kolme')

				cy.server()
				cy.route('PUT', '/api/blogs/*').as('blogsPUT')

				cy.contains('TestiBlogi Kolme').contains('view').click()

				for (let i = 0; i < 2; i++) {
					cy.get('#likeButton').click()
					cy.wait('@blogsPUT', { responseTimeout: 5000 })
				}

				cy.get('#blog')
					.should('contain', 'TestiBlogi Kolme')
					.and('not.contain', 'TestiBlogi Neljä')
			})
		})
	})
})