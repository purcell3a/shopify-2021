function Homepage({nominations, user, setNominations,triggerNominations,setTriggerNominations}) {

    const [apiKey, setApiKey] = React.useState('')
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('Batman')
    const [movies, setMovies] = React.useState([])
    const [showAlert, setShowAlert] = React.useState(false);
    const [nominationLimitModal, setNominationLimitModal] = React.useState(false);
    const [lastNominationModal, setLastNominationModal] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/apikey')
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setApiKey(data))
        .then(api_call())
    },[apiKey])


    function api_call(){
        setLoading(true);
        setError(null);
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}&t=movie`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => {
            if (data.Response === 'False') {
                setError(data.Error);
            }
            else {
                setMovies(data.Search);
            }
            setLoading(false);
        })
        .catch(({message}) => {
            setError(message);
            setLoading(false);
        })
        generateMovieCards()
    }


    function nominate(imdbID,title,poster,year){
        setTriggerNominations(imdbID)
        let user_id = user? user.id:alert('Please Log In To Nominate')
        let data = {'imdbID':imdbID,'user_id':user_id,'title':title,'poster':poster, 'year':year}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {
            if (data === 'User has 5 nominations'){
                setNominationLimitModal(true)
            }
            else if (data ==='Last Nomination!'){
                setTriggerNominations(data)
                setLastNominationModal(true)
            }
            else{
                setTriggerNominations(data)
            }
            generateMovieCards()
        });
    }


    function generateMovieCards(){
        const cards = movies.map((movie,index) =>(

            <Card  key={movie.Title + index} value={movie.imdbID}>

                <Card.Img   variant="top"
                            src={movie.Poster}/>

                <Card.Body>

                <Card.Title>
                    <div className='truncate-description'>{movie.Title}</div>
                    <h6><small>{movie.Year}</small></h6>
                </Card.Title>

                {user.submission_status == 'false'? (

                    (nominations && nominations.filter(nomination => nomination.Title === movie.Title)).length?
                        <div></div>
                        :
                        <Button
                        id="hover-button"
                        variant="primary"
                        onClick={() =>{nominate(movie.imdbID,movie.Title,movie.Poster,movie.Year)}}>
                        nominate
                    </Button>
                    )
                    :
                    <div></div>
                }

              </Card.Body>

            </Card>
        ))
        return cards
    }


    function handleSearchChange(evt){
        setSearch(evt.target.value)
        api_call()
    }


    return (

        <React.Fragment>

            {nominationLimitModal &&(

                <NominationLimitModal
                    show={nominationLimitModal}
                    onHide={() => setNominationLimitModal(false)}/>

            )}

            {lastNominationModal &&(

                <LastNominationModal
                    user={user}
                    show={lastNominationModal}
                    onHide={() => setLastNominationModal(false)}/>
            )}

            <Row id='search-row'>

                  <Form inline>
                    <FormControl type="text"
                    placeholder="Movie Title"
                    className=" mr-sm-2"
                    id='search-input'
                    value={search}
                    onChange={handleSearchChange} />
                </Form>

            </Row>

            <Row id='movie-row'>

                <Col xs={6} md={3}>

                    <Nomination user={user}
                                nominations={nominations}
                                setNominations={setNominations}
                                setShowAlert={setShowAlert}
                                showAlert={showAlert}
                                triggerNominations={triggerNominations}
                                setTriggerNominations={setTriggerNominations}/>
                </Col>

                <Col xs={12} md={9}>

                    { loading &&
                        <div>loading</div>
                    }

                    { error !== null &&
                        <div>
                            <Alert message={error} type="error" />
                        </div>
                    }

                    { movies != undefined &&
                    generateMovieCards()
                    }

                </Col>

            </Row>

        </React.Fragment>
    );
}
