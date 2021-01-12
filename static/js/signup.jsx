"use strict";

  function Signup({setUser}) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')

    function handleSubmit(evt){
      evt.preventDefault()
      let data = {email:email, password:password, fname:fname, lname:lname}
      fetch('/api/signup',
      {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(data => {
          if (data == 'account created'){
            alert('account created, please login')
          }else{
            alert('invalid email or password')
          }
       });
    }

      return (

        <React.Fragment>
            <Row className="login-signup-row">

                <Col id='login-column'>
                    <Login setUser={setUser}/>
                </Col>

                <Col id='signup-column'>

                    <Form id='signupform' onSubmit={handleSubmit}>

                          <Form.Group controlId="formBasicfname">
                            <Form.Control type="text"
                                          name="fname"
                                          placeholder="First"
                                          value={fname}
                                          onChange={() => setFname(value)}></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="formBasiclname">
                            <Form.Control type="text"
                                          name="lname"
                                          placeholder="Last"
                                          value={lname}
                                          onChange={() => setLname(value)}></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="formBasicemail">
                            <Form.Control type="email"
                                          name="email"
                                          placeholder="email"
                                          value={email}
                                          onChange={() => setEmail(value)}></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="formSignupPassword">
                            <Form.Control type="password"
                                          name="password"
                                          placeholder="password"
                                          value={password}
                                          onChange={() => setPassword(value)}></Form.Control>
                          </Form.Group>

                          <Button id='register-button'
                                  variant="primary"
                                  type="submit">
                                  Register
                          </Button>

                    </Form>

                </Col>

              </Row>
          </React.Fragment>
        );
}