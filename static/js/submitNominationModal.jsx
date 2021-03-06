function SubmitNominationModal(props) {


  function copyToClipBoard(link){
    window.prompt("Copy to clipboard: Ctrl+C, Enter", link);
    alert("Copied the text: " + link);
  }


  return (

    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

      <Modal.Body>

        <h4>Congrats!</h4>
        <p>
          Thanks for taking part in the Shoppies 2021 Movie awards!
        </p>

      </Modal.Body>

      <Modal.Footer>

        <Button onClick={() => copyToClipBoard(props.shareablelink)}>
         Copy link to clipboard
        </Button>

        <Button className="twitter-share-button" 
                id="tweet-button"
                href={`https://twitter.com/intent/tweet?text=I%20just%20submit%20nominations%20for%20Shoppies%202021%20awards!%20https%3A%2F%2F${props.shareablelink}%2F`}>
                Tweet
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

