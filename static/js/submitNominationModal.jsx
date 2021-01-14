function SubmitNominationModal(props) {

  function copyToClipBoard(link){
    document.execCommand("copy");
    alert("Copied the text: " + link);
  }
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

        <Button onClick={() => copyToClipBoard(props.shareableLink)}>
         Copy link to clipboard
        </Button>


                   <a class="twitter-share-button"
                    rel="canonical"
                    href={`https://twitter.com/intent/tweet?text=I%20just%20submit%20nominations%20for%20Shoppies%202021%20awards!%20https%3A%2F%2F${props.shareableLink}%2F`}>
                  Tweet</a>

        </Modal.Footer>
      </Modal>
    );
  }

// sourced from https://codesandbox.io/s/react-hooks-counter-demo-forked-9lsol?file=/src/index.js:103-448
// https://stackoverflow.com/questions/63546951/react-copy-to-clipboard-using-useref-hook

