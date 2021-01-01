// "use strict";
function LandingPage(props) {

    const history = useHistory()

    return (

        <React.Fragment>


            <Jumbotron fluid>
            <h1>Welcome to Angela Purcell's Shopify 2021 Application!</h1>


            <p>
                <Button className="login-button"
                        variant="primary" onClick={() =>  history.push({pathname:'/signup'})}>
                        Front-End Project
                </Button>

                <Button className="login-button"
                        variant="primary" onClick={() =>  history.push({pathname:'/signup'})}>
                        Back-End Project
                </Button>
            </p>
            </Jumbotron>


        </React.Fragment>
    );
}
