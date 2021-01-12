function LastNominationModal(show, user) {

  const history = useHistory()

  function handleSubmission(){
    console.log(user)
    show.onHide
    let user_id = user.id
    let data = {'user_id':user_id}
    fetch('/api/toggle-submission-status',
    {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(data => {console.log(data)});
    history.push('/usernomination')
  }

  return (
      <Modal
        {...show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Woot!</h4>
          <p>
            You just nominated your 5th Movie, submit your nominations to continue!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={show.onHide}>return to movies</Button>
          <Button onClick={() => handleSubmission()}>Submit Movies</Button>
        </Modal.Footer>
      </Modal>
  );
}