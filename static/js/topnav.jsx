"use strict";
// ! do we want the search bar in the topnav? 

function TopNav(props){

  const history = useHistory()

  function handleSubmit(evt){
    evt.preventDefault()
    localStorage.removeItem('user');
    props.setUser(undefined)
    console.log('logged out')
    history.push('/');
  }


    return(
        <React.Fragment>
        <Navbar
        scrolling="true"
        expand="sm"
        fixed='top'
        id='topnav'>



             <Navbar.Brand>
                <img id="logo"
                    src="/static/img/macos-app-icons-shopify-png-icon-thumbnail.jpg"
                    className="d-inline-block align-top"
                    alt="Shopify Logo"
                />
                 <Link to='/'
                    id='shoppies'>
                    Shoppies
                </Link>
            </Navbar.Brand>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {props.user?'':<Nav.Link to="/signup">Login | Signup</Nav.Link>}
                        {props.user?
                        <NavDropdown title= {props.user.fname} id="basic-nav-dropdown">
                                <NavDropdown.Item><Button onClick={handleSubmit} variant="light">Logout</Button></NavDropdown.Item>
                        </NavDropdown>:''}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

        </React.Fragment>
    );
}
