function UserNominations({user}) {

    let { user_id } = useParams();
    const [submitNomination, setSubmitNomination] = React.useState(true);
    const [movies, setMovies] = React.useState([])


    React.useEffect(() => {
        let data = {'user_id' : user_id}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setMovies(data))
    }, []);


    function generateMovieCards(){

        const cards = movies.map((movie,index) =>(

            <Card   key={movie.Title + index} value={index}>

                <Card.Img   variant="top"
                            src={movie.Poster}/>

                <Card.Body>

                <Card.Title>
                    <div className='truncate-description'>{movie.Title}</div>
                    <h6><small>{movie.Year}</small></h6>
                </Card.Title>

              </Card.Body>

            </Card>

        ))
        return cards
    }


    return (

        <React.Fragment>

            {submitNomination &&(

                <SubmitNominationModal
                    show={submitNomination}
                    shareablelink = {`localhost:5000/`}
                    onHide={() => setSubmitNomination(false)}/>
            )}

            <Jumbotron id='user-submitted-nominations'>

                <span id='submission-header-box'>
                    <h1 id='thanks-for-submitting'>{user.fname}'s Submissions!</h1>
                </span>

                <Row id='submission-row'>
                    {generateMovieCards()}
                </Row>

            </Jumbotron>

        </React.Fragment>

    );
}