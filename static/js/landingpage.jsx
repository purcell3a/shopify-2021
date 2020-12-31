// "use strict";
function LandingPage(props) {

    const history = useHistory()

    return (

        <React.Fragment>


            <Jumbotron fluid>
            <h1>Welcome to Shoppies Annual Movie Awards!</h1>
            <p>
                Login to Nominate your Favorites
            </p>
            <p>
                <Button className="login-button"
                        variant="primary" onClick={() =>  history.push({pathname:'/signup'})}>
                        Login | Signup
                </Button>
            </p>
            </Jumbotron>


        </React.Fragment>
    );
}
