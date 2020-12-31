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
                 <Link to='/'>
                    Shoppies
                </Link>
            </Navbar.Brand>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {props.user?'':<Nav.Link><Link to="/signup">Login | Signup</Link></Nav.Link>}
                        {props.user?
                        <NavDropdown title= {props.user.fname} id="basic-nav-dropdown">
                                <NavDropdown.Item><Link to="/user-profile">Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item><Button onClick={handleSubmit} variant="light">Logout</Button></NavDropdown.Item>
                        </NavDropdown>:''}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>

        </React.Fragment>
    );
}
