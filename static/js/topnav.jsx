"use strict";
function TopNav({user, setUser}){

  const history = useHistory()

  function handleSubmit(evt){
    evt.preventDefault()
    localStorage.removeItem('user');
    setUser({fname: "", id: 0, sumbission_status:'false'})
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
                        {user?'':<Nav.Link to="/signup">Login | Signup</Nav.Link>}
                        {user?
                            <NavDropdown title= {user.fname} id="basic-nav-dropdown">
                                    <NavDropdown.Item><Button onClick={handleSubmit} variant="light">Logout</Button></NavDropdown.Item>
                            </NavDropdown>:''}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

        </React.Fragment>
    );
}
