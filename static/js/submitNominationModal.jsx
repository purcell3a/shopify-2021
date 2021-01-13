function SubmitNominationModal(props) {
  console.log('submitnominationsmodalprops',props)
  
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
          <div> text here <a>{props.shareableLink}</a></div>
          <Button onClick={props.onHide}>Share with Friends</Button>
        </Modal.Footer>
      </Modal>
    );
  }