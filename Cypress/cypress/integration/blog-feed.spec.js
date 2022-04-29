// Homepage Blog Feed.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Test the post feed', () => {
	
	it('Visits the blog page', () => {
		cy.visit('/_site/posts.html')
		cy.contains('Latest Posts')
	})

	it('Blog page is added to the navigation menu', () => {
		cy.visit('/_site/posts.html')
		cy.get('#main-navigation').contains('Posts')
	});

	it('Has posts in the feed', () => {
		cy.visit('/_site/posts.html')
		// Assert that there are 2 posts
		cy.get('.max-w-3xl').children().should('have.length.gte', 2)
	})

	// Check that the post excerpt in the feed contains expected content
	it('Post excerpt contains expected content', () => {
		cy.visit('/_site/posts.html')
		cy.get('.max-w-3xl').children().first().contains('Markdown with Images')
		cy.get('.max-w-3xl').children().first().contains('Apr 12th, 2022, by Mr. Hyde')
		cy.get('.max-w-3xl').children().first().contains('Contains more Markdown types, and a featured image')
	});

	// Check that the excerpt has a link to the post
	it('Post excerpt has a working link to the post', () => {
		cy.visit('/_site/posts.html')
		cy.get('.max-w-3xl').children().first().find('a').should('have.attr', 'href', 'posts/markdown-images.html')

		// Visit the link
		cy.get('.max-w-3xl').children().first().find('a').first().click()
		cy.url().should('include', 'posts/markdown-images.html')
	})
})

// Test the post page
describe('Test the post page', () => {
	it('Visits the post page', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.contains('Markdown with Images')
	})

	it('Post page is added to the navigation menu', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.get('#main-navigation').contains('Posts')
	});

	it('Post page has the correct content', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.contains('Markdown with Images')
		cy.contains('Posted Apr 12th, 2022 by author Mr. Hyde in the category "blog"')
		cy.contains('Write something awesome.')
	});

	// it has an h1 heading with the title
	it('Post page has an h1 heading with the title', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.get('h1').contains('Markdown with Images')
	});

	// it has markdown content
	it('Post page has markdown content', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.get('h2').contains('Write something awesome.')

		// There is an unordered list with three items in the article
		cy.get('article').find('ul').children().should('have.length', 3)

		// Article has numbered list with three items
		cy.get('article').find('ol').children().should('have.length', 3)

		// Article has a blockquote with text "This is a blockquote"
		cy.get('article').find('blockquote').contains('This is a blockquote')

		// Article has two images (cover image and extra image)
		cy.get('article').find('img').should('have.length', 2)

		// Article has code block with HMTL "<h1>Hello World</h1>"
		cy.get('article').find('code').contains('<h1>Hello World</h1>')

		// Article has inline code block with text "inline code"
		cy.get('article').find('code').contains('inline code')
	})
})

// Test the cover image
describe('Test the cover image', () => {
	it('Visits the post page', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.contains('Markdown with Images')
	})

	it('Cover image is added to the post page', () => {
		cy.visit('/_site/posts/markdown-images.html')
		cy.get('article').find('figure').should('have.length', 1)

		// Cover image has a caption
		cy.get('article').find('figure').find('figcaption').contains('Image by Godsgirl_madi. Copyright (c) 2022. License Pixabay License')
	
		// Cover image has alt text
		cy.get('article').find('figure').find('img').should('have.attr', 'alt', 'Image of a small kitten with its head tilted, sitting in a basket weaved from nature material.')

		// Cover image has title text
		cy.get('article').find('figure').find('img').should('have.attr', 'title', 'Kitten Gray Kitty [sic]')
	})
})