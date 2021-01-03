//  IN PROGRESS ---
//  MAKE ALERT SHOW ON FULL PAGE
//  MAKE NOMINATE BUTTON SHOW ON MOVIE CARD HOVER
//  ALLOW USERS TO REMOVE NOMINATIONS
//  SHOW ALERT WHEN USERS HAVE HIT 5 NOMINATIONS

function Nomination(props) {

    const [nominations, setNominations] = React.useState([{'Title':'looks like you have none','imdbID':'none'}])
    const [showAlert, setShowAlert] = React.useState(false);



    React.useEffect(() => {
        let data = {'user_id' : 1}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setNominations(data))
      }, [nominations]);


      function handleStarClick(imdbID,title){
        let user_id = props.user.id
        let data = {'imdbID':imdbID,'user_id':user_id,'Title':title}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {console.log(data)});
    }


    function generateNominationCards(){
        const cards = nominations.map((movie,index) =>(

            <div key={index} value={index}>

                <i className="white fa fa-star" onClick={() => handleStarClick(movie.imdbID, movie.Title)}></i>
                <span className='truncate-description'>{movie.Title}</span>

            </div>

        ))
        return cards
    }


    return (

        <React.Fragment>
            {/* MAKE THIS ALERT SHOW ON FULL PAGE */}

               {showAlert && (
                <Alert variant="success">
                    <Alert.Heading>Congrats!</Alert.Heading>
                    <p>
                        Your Nominations have been submit! You will now be redirected to the home page.
                    </p>
                </Alert>
            )}

            <div id="nomination-div">

                Your Nominations

                {generateNominationCards()}

                <Button
                    variant="primary" onClick={() => setShowAlert(true)}>
                    Submit Nominations
                </Button>

            </div>

        </React.Fragment>
    );
}