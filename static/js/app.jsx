const Router = ReactRouterDOM.BrowserRouter;
const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function App() {

    const [user, setUser] = React.useState({fname: "", id: 0, sumbission_status:'false'})
    const [nominations, setNominations] = React.useState([{'Title':'looks like you have none','imdbID':'none'}])
    const [triggerNominations, setTriggerNominations] = React.useState('')


    React.useEffect(() => {
        const currentuser = JSON.parse(localStorage.getItem('user'));
        currentuser? setUser(currentuser): console.log(currentuser)
    },[]);


    React.useEffect(() => {
        let data = {'user_id':user.id}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
         .then(data => setNominations(data))
    }, [triggerNominations, user]);


    return (
      <Router>

          <Switch>

                <Route exact path="/">
                    <LandingPage/>
                </Route>


                <Route path='/login'>
                    <Login user={user} setUser={setUser}/>
                </Route>


                <Route path='/signup'>
                    <Signup setUser={setUser} user={user}/>
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
                                setTriggerNominations={setTriggerNominations}/>
                </Route>


                <Route path="/usernomination/:user_id">
                    <TopNav user={user} setUser={setUser}/>
                    <UserNominations user={user}
                                nominations={nominations}
                                setNominations={setNominations}/>
                </Route>

          </Switch>

      </Router>

    );
}

ReactDOM.render(<App />, document.getElementById('app'));

