// "use strict";
function LandingPage(props) {

    const history = useHistory()

    return (

        <React.Fragment>


            <Jumbotron fluid>
            <h1>Welcome to Shoppies 2021 Movie Awards!</h1>
            <h5>Login to Nominate your favorites.</h5>


            <p>
                <Button className="login-button"
                        variant="primary" onClick={() =>  history.push({pathname:'/signup'})}>
                        Login |  Signup
                </Button>
            </p>
            </Jumbotron>


        </React.Fragment>
    );
}
