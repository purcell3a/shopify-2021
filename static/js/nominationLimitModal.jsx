function NominationLimitModal(props) {

  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

        <Modal.Body>

          <h4>oops!</h4>
          <p>
            Looks like you've already nominated 5 movies!
          </p>

        </Modal.Body>

        <Modal.Footer>

          <Button onClick={props.onHide}>return to movies</Button>

        </Modal.Footer>

      </Modal>
    );
  }
