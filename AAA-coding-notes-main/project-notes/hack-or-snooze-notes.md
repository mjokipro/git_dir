- Arrive at page
	- Start
	- checkForRememberedUser
	- putStoriesOnPage
- login/signup link
	- navLoginClick
		- Brings to page with two forms: login & create account
	- Login (leads to login event)  OR create account (leads to signup event), then BOTH:
		- (send POST request to server?)
			- retrieve token
		- saveUserCredentialsInLocalStorage
			- save token from POST request to API to localStorage
		- updateUIOnUserLogin 
			-  Does this call updateNavOnLogin?
			-  articles have star buttons next to them (filled in if favorited in past)
		-  putStoriesOnPage
		-  updateNavOnLogin
			- now see submit, favorites, my stories, links in navbar
			- username is in top right corner with link to logout
		-  generateUserProfile
	- Logout link
		- reloads page, brings to same msgs as arrive at page
- Navbar
	- submit link
		- navSubmitStoryClick (click event)
		- submitting a story leads to:
			- submitNewStory
				- use saved token with POST request for story
			- UI to main page - user story at top
	- favorites link
		- navFavoritesClick (click event)
		- putFavoritesListOnPage
		- UI is to page with just favoritied stories or message “No favorites added yet!“
	- my stories link
		- navMyStories (click event)
		- putUserStoriesOnPage
		- UI is to page with just stories added by user, with trash icon on left or message “No stories added by user yet!”
		- Clicking on Trash icon leads to:
			- deleteStory
			- putUserStoriesOnPage
- Main page
	- Save articles to favorites
		- Clicking on star to favorite article:
			-  toggleStoryFavorite – toggles css class

## Questions
- Does favoriting require using the token? 
	- YES
- Payload mean data sent? 
	- YES
- Why is there getHostName() in Story class? what does this do?
	- Simplifies hostname for post