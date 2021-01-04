function SubmitNominationModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Congrats!</h4>
          <p>
            Thanks for taking part in the Shoppies 2021 Movie awards!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Share with Friends</Button>
          <Button onClick={props.onHide}>Exit</Button>
        </Modal.Footer>
      </Modal>
    );
  }