
function Nomination({user,nominations,setTriggerNominations}) {

    const history = useHistory()


    function removeNominate(imdbID,title){
        setTriggerNominations(title)
        let user_id = user.id
        let data = {'imdbID':imdbID,'user_id':user_id,'title':title}
        fetch('/api/remove-nominate',
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {setTriggerNominations(data)});
    }

    function handleSubmission(){
        console.log('nominations',user)
        let user_id = user.id
        let data = {'user_id':user_id}
        fetch('/api/toggle-submission-status',
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {console.log(data)});
        history.push('/usernomination')
    }


    function generateNominations(){

        const cards = nominations.map((movie,index) =>(

            <div    key={movie.Title + index}
                    value={index}>

                <p className='truncate-description'>

                {user.submission_status == 'false'?

                    (<i  className="fa fa-times-circle"
                    id="remove-nomination"
                    onClick={() => removeNominate(movie.imdbID, movie.Title)}>
                    </i>
                    )
                    :
                    <div></div>
                }
                    {movie.Title}
                </p>

            </div>

        ))
        return cards
    }


    return (

        <React.Fragment>

            <div id="nomination-div">

                <span id='nominations-title'>Your Nominations</span>

                <div  id="nominated-titles">
                    {generateNominations()}
                </div>

                {user.submission_status == 'false'?

                    (nominations.length == 5 ?
                        <Button
                            variant="primary"
                            id="submit-nominations-button"
                            onClick={() => handleSubmission()}>
                            Submit Nominations
                        </Button>
                        :
                        <div id="choose-5-to-submit">
                            Choose 5 to Submit
                        </div>
                    ):
                    <Button
                    variant="primary"
                    id="submit-nominations-button"
                    // onClick={() => handleSubmission()}
                    >
                    Share
                    </Button>
                }

            </div>

        </React.Fragment>
    );
}