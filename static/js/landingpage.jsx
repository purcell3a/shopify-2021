// "use strict";
function LandingPage(props) {

    const history = useHistory()

    return (

        <React.Fragment>


            <Jumbotron fluid>
                <span id='white-box'>
                    <h1 id='welcome-text'>Shoppies 2021 Movie Awards!</h1>
                    <Button id="login-signup-button"
                            variant="primary" onClick={() =>  history.push({pathname:'/signup'})}>
                            Login |  Signup
                    </Button>
                </span>
            </Jumbotron>


        </React.Fragment>
    );
}
