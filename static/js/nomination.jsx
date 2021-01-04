
function Nomination(props) {

    const [submitNomination, setSubmitNomination] = React.useState(false);
    console.log(props.nominations)

    React.useEffect(() => {
        let data = {'user_id' : 1}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => props.setNominations(data))
      }, [props.nominations]);


      function handleStarClick(imdbID,title){
        let user_id = props.user.id
        let data = {'imdbID':imdbID,'user_id':user_id,'title':title}
        fetch('/api/remove-nominate',
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {console.log(data)});
    }


    function generateNominations(){
        let nominate = props.nominations
        const cards = nominate.map((movie,index) =>(

            <div    key={index}
                    value={index}>

                <p className='truncate-description'>

                    <i  className="fa fa-times-circle"
                        id="remove-nomination"
                        onClick={() => handleStarClick(movie.imdbID, movie.Title)}></i>

                    {movie.Title}
                </p>

            </div>

        ))
        return cards
    }


    return (

        <React.Fragment>

            {submitNomination &&(

            <SubmitNominationModal
                show={submitNomination}
                onHide={() => setSubmitNomination(false)}/>

            )}

            <div id="nomination-div">

                <span id='nominations-title'>Your Nominations</span>

                <div  id="nominated-titles">
                    {generateNominations()}
                </div>

                {props.nominations.length == 5 ?
                    <Button
                        variant="primary"
                        id="submit-nominations-button"
                        onClick={() => setSubmitNomination(true)}>
                        Submit Nominations
                    </Button>
                    :
                    <div id="choose-5-to-submit">
                        Choose 5 to Submit
                    </div>
                }

            </div>

        </React.Fragment>
    );
}