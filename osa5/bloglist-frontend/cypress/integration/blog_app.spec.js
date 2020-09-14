describe('Blog app:', function () {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/tests/reset')
		const user = {
			name: 'Testi Mies',
			username: 'tmies',
			password: 'supersekret'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	it('Login form is shown at start', function () {
		cy.contains('log in to application')
	})

	describe('Login ', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('tmies')
			cy.get('#password').type('supersekret')
			cy.get('#login-button').click()
			cy.contains('Testi Mies logged in')
	
			cy.get('.note')
				.should('contain', 'Testi Mies logged in')
				.and('have.css', 'color', 'rgb(0, 128, 0)')
		})
	
		it('fails with wrong pw', function() {
			cy.get('#username').type('tmies')
			cy.get('#password').type('sekret')
			cy.get('#login-button').click()
	
			cy.get('.error')
				.should('contain', 'Invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
			
			cy.get('html').should('not.contain', 'Testi Mies logged in')
		})
	})

	describe.only('When logged in ', function() {
		beforeEach(function() {
			cy.login({ username: 'tmies', password: 'supersekret' })
		})
		//Tee testi, joka varmistaa, että kirjaantunut käyttäjä pystyy luomaan blogin.
		//Testin tulee varmistaa, että luotu blogi tulee näkyville blogien listalle.
		it('a blog can be created', function() {
			/*
			cy.createBlog({
				title: 'TestiBlogi',
				author: 'Testimiehen Isä',
				url: 'localhosti on ainoa urli, mitä tiedän'
			})
			*/
			cy.contains('new blog').click()
			cy.get('#title').type('TestiBlogi')
			cy.get('#author').type('Testimiehen Isä')
			cy.get('#url').type('http://localhost.on/ainoa-url')
			cy.get('#blog-create-button').click()

			cy.contains('TestiBlogi')
		})
	})
})