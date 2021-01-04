# Shopify-2021
Shoppies - job application project for shopify 2021 internship

# The Challenge

We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. 
When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:
- Search OMDB and display the results (movies only)
###### By adding `'t=movie'` to the end of the API url we are able to ensure only the Movie 'type' is returned. 

- Add a movie from the search results to our nomination list

- View the list of films already nominated

- Remove a nominee from the nomination list

# Technical requirements

1. Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).

1. Each search result should list at least its title, year of release and a button to nominate that film.

1. Updates to the search terms should update the result list

1. Movies in search results can be added and removed from the nomination list.

1. If a search result has already been nominated, disable its nominate button.

1. Display a banner when the user has 5 nominations.

# Extras

 - Save nomination lists if the user leaves the page
 - Animations for loading, adding/deleting movies, notifications
 - Create shareable links


# Stack

- React Hookks
- Python
- HTML
- CSS
- Bootstrap
- Flask
- SQLAlchemy
