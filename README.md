# Shopify-2021

This is my application project for the front end shopify internshi application 2021
You can find the the project deployed at http://54.213.160.218/

Listed:
- The Challenge
- The Technical Requirements
- Extras
- Stack
- Issues
- Directions for running on your machine

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
 ###### When a user nominateds a movie, a HTTP request is send to an API endpoint and saved to the database. The user nominations are then rendered from the database. This way every nominations is saved and accessible by the user at any time.
 - Animations for loading, adding/deleting movies, notifications
  ###### Modals are used to notify the user when they have nominated their last nominations, or try to nominate too many
 - Create shareable links
###### Sources used for shareable links:
###### https://codesandbox.io/s/react-hooks-counter-demo-forked-9lsol?file=/src/index.js:103-448
###### https://img-9gag-fun.9cache.com/photo/agyx4Dn_700bwp.webp
###### https://stackoverflow.com/questions/63546951/react-copy-to-clipboard-using-useref-hook
###### https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
###### https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

# Stack

- React Hooks
- Python
- HTML
- CSS
- Bootstrap
- Flask
- SQLAlchemy


# Issues

- The search results don't always format well if there isn't a space after the movie title
- The search could be more intuitive, in the future I'd add clearer instructions or labels
- The profile doesn't always automatically revoke nominations privileges once a user has submit
- The tweet should be pre-filled with hastags and a clickable link (rather than plain text)
- The copy to clipboard could be more seemless
- I committed to my github before hiding the APIKEY and wasn't worried about this because it's free but would not do this in the future
- Some of the movie posters are different sizes so I'd like to build a design more suited to the images
- The shareable link should show the individuals nominations and not the homepage
- The site is not yet mobile friendly

# Directions

- Download files
- Get your own API key and place in a secrets.sh file like so `export APIKEY="yourkey"`
- Create .gitignore file and add secrets.sh
- If you use virtual environments then start one `$ virtualenv env`(initiate) `$ source env/bin/activate`(run)
- Source your secrets file `$ source secrets.sh` (every single time you open a new terminal)
- Download required packages by running ` $ pip3 install -r requirements.txt`
- Build database by running `$python3 seed_db.py`
- Launch your server! `python3 server.py`