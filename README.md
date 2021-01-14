# Shopify-2021
Shoppies - job application project for shopify 2021 internship

# The Challenge

We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination.
When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
- Search OMDB and display the results (movies only)
###### By adding `'t=movie'` to the end of the API url we are able to ensure only the Movie 'type' is returned.

- Add a movie from the search results to our nomination list
###### Users can nominate movies by pressing the 'Nominate' button which reveals itself upon hovering over the movie card

- View the list of films already nominated
###### Nominations.jsx  is displayed to the left of all movies displays all nominations and updates in real time

- Remove a nominee from the nomination list
###### users can remove nominations by pressing the 'x' next to the movie title in the box to the left of the search results

# Technical requirements

1. Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).

1. Each search result should list at least its title, year of release and a button to nominate that film.
###### Movie title and year are shown below the movie poster, the movie can be nominated by hovering over the poster

1. Updates to the search terms should update the result list
###### The results update in real time when the user types into the search box

1. Movies in search results can be added and removed from the nomination list.
###### Movies can be added by hovering over the movie and selecting the "Nominate" button
###### Movies can be removed using the 'x' in list of nominations on the left of the screen

1. If a search result has already been nominated, disable its nominate button.
###### Removed nomination button once movie has been nominatied rather than displaying one that said "Nominated"

1. Display a banner when the user has 5 nominations.
###### The modal from setLastNominationModal.jsx is shown when the user nominates their last nomination
###### The modal in nominationLimitModal.jsx is is shown if a user attempts to nominate more than 5 movies

# Extras

 - Save nomination lists if the user leaves the page
 - Animations for loading, adding/deleting movies, notifications
 - Create shareable links
###### Sources used for shareable links:
###### https://codesandbox.io/s/react-hooks-counter-demo-forked-9lsol?file=/src/index.js:103-448
###### https://stackoverflow.com/questions/63546951/react-copy-to-clipboard-using-useref-hook
###### https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview



# Stack

- React Hookks
- Python
- HTML
- CSS
- Bootstrap
- Flask
- SQLAlchemy
