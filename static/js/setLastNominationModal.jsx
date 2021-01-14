function LastNominationModal(props) {

  const history = useHistory()
  // console.log('nominations userid',user_id)
  // console.log('paramsuserid',user_id)

  function handleSubmission(user_id){
    console.log('setlastuserid',user_id)
    props.onHide
    let data = {'user_id':user_id}
    fetch('/api/toggle-submission-status',
    {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => {console.log(data)});
    history.push({pathname:`/usernomination/${user_id}`})
  }

  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Body>
          <h4>Woot!</h4>
          <p>
            You just nominated your 5th Movie, submit your nominations to continue!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>return to movies</Button>
          <Button onClick={() => handleSubmission(props.user.id)}>Submit Movies</Button>
        </Modal.Footer>
      </Modal>
  );
}