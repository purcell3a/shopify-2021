// TODO We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel
// TODO should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

// ! TODO Search OMDB and display the results (movies only)

// ! TODO Add a movie from the search results to our nomination list

// * View the list of films already nominated

// ! TODO Remove a nominee from the nomination list

// * TODO Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx).

// * TODO Each search result should list at least its title, year of release and a button to nominate that film.

// ! TODO Updates to the search terms should update the result list

// ! TODO Movies in search results can be added and removed from the nomination list.

// ! TODO If a search result has already been nominated, disable its nominate button.

// TODO Display a banner when the user has 5 nominations.




const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {

    const [apiKey, setApiKey] = React.useState('')
    const [user, setUser] = React.useState(undefined)

    React.useEffect(() => {
      const currentuser = JSON.parse(localStorage.getItem('user'));
      setUser(currentuser)
    },[]);

    React.useEffect(() => {
        fetch('/api/apikey')
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setApiKey(data))
    },[])

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
                    <Homepage user={user}/>
                </Route>

                <Route path="/nomination">
                    <Nomination user={user} apiKey={apiKey}/>
                </Route>

          </Switch>

      </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('app'));

