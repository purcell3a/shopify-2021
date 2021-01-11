
function Nomination({user, nominations,setNominations}) {

    const [submitNomination, setSubmitNomination] = React.useState(false);

    function handleStarClick(imdbID,title){
        let user_id = user.id
        let data = {'imdbID':imdbID,'user_id':user_id,'title':title}
        fetch('/api/remove-nominate',
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {setNominations(data)});
    }


//  GETTING AN ERROR WITH .MAP ON EVERY MOVIE NOMINATION WHEN I USE PROPS.NOMINATIONS

    function generateNominations(){

        const cards = nominations.map((movie,index) =>(

            <div    key={movie.Title + index}
                    value={index}>

                <p className='truncate-description'>

                    <i  className="fa fa-times-circle"
                        id="remove-nomination"
                        onClick={() => handleStarClick(movie.imdbID, movie.Title)}>
                    </i>

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

                {nominations.length == 5 ?
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