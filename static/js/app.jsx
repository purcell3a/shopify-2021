// TODO We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel
// TODO should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

// * Search OMDB and display the results (movies only)

// *  Add a movie from the search results to our nomination list

// * View the list of films already nominated

// * Remove a nominee from the nomination list

// *  Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).

// *  Each search result should list at least its title, year of release and a button to nominate that film.

// * TODO Updates to the search terms should update the result list

// * TODO Movies in search results can be added and removed from the nomination list.

// * TODO If a search result has already been nominated, disable its nominate button.

// * Save nomination lists if the user leaves the page

// ! Animations for loading, adding/deleting movies, notifications

// ! Create shareable links

// * TODO Display a banner when the user has 5 nominations.

// * MAKE NOMINATE BUTTON SHOW ON MOVIE CARD HOVER

// ! PAGE NOT LOADING WHEN NO NOMINATIONS ARE PRESENT

// * If USER LOGS BACK IN SHOW THEM THE MOVIES THEY HAVE NOMINATED

const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {

    const [user, setUser] = React.useState(undefined)
    const [nominations, setNominations] = React.useState([{'Title':'looks like you have none','imdbID':'none'}])
    const [triggerNominations, setTriggerNominations] = React.useState('')


    React.useEffect(() => {
        let data = {'user_id' : 1}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setNominations(data))
    }, [triggerNominations]);


    React.useEffect(() => {
      const currentuser = JSON.parse(localStorage.getItem('user'));
      setUser(currentuser)
    },[]);

    return (
      <Router>

          <Switch>

                <Route path='/login'>
                    <Login user={user} setUser={setUser}/>
                </Route>


                <Route path='/signup'>
                    <Signup setUser={setUser} user={user}/>
                </Route>


                <Route exact path="/">
                    <LandingPage user={user} />
                </Route>

                <Route exact path='/homepage'>
                    <TopNav user={user} setUser={setUser}/>
                    <Homepage user={user}
                              nominations={nominations}
                              setNominations={setNominations}
                              setTriggerNominations={setTriggerNominations}
                              triggerNominations={triggerNominations}/>
                </Route>

                <Route path="/nomination">
                    <Nomination user={user}
                                nominations={nominations}
                                setNominations={setNominations}
                                setTriggerNominations={setTriggerNominations}
                                triggerNominations={triggerNominations}/>
                </Route>

          </Switch>

      </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('app'));

