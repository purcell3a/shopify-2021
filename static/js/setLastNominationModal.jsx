function LastNominationModal(props) {
    return (
      <Modal
        {...props}
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
          <Button onClick={props.onHide}>return to movies</Button>
          <Button onClick={props.onHide}>Submit Movies</Button>
        </Modal.Footer>
      </Modal>
    );
  }