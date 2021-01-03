// "use strict";
//  ! maybe get rid of poster as well
function Homepage(props) {

    const [nominations, setNominations] = React.useState([{'Title':'looks like you have none','imdbID':'none'}])
    const [apiKey, setApiKey] = React.useState('')
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('Batman')
    const [movies, setMovies] = React.useState([])
    const [showAlert, setShowAlert] = React.useState(false);
    const [nominationLimitModal, setNominationLimitModal] = React.useState(false);
    const [lastNominationModal, setLastNominationModal] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    const history = useHistory()


    React.useEffect(() => {
        fetch('/api/apikey')
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setApiKey(data))
        .then(api_call())
    },[])

    //! set T to movie so only movie are returned but now everything disapears if someone searches somethign that doesn't give a result

    function api_call(){
        setLoading(true);
        setError(null);
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=e67626fa&t=movie`)
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


    function nominate(imdbID,title){
        let user_id = props.user? props.user.id:alert('Please Log In To Nominate')
        let data = {'imdbID':imdbID,'user_id':user_id,'title':title}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {
            if (data === 'User has 5 nominations'){
                setNominationLimitModal(true)
            }
            else if (data ==='Last Nomination!'){
                setNominations(data)
                setLastNominationModal(true)
            }
            else{
                setNominations(data)
            }
        });
    }

    function generateMovieCards(){
        const cards = movies.map((movie,index) =>(

            <Card   key={movie.Title + index} value={index}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
            >

                <Card.Img   variant="top"
                            src={movie.Poster}
                />

                <Card.Body>

                <Card.Title>
                    <div className='truncate-description'>{movie.Title}</div>
                    <h6><small>{movie.Year}</small></h6>
                </Card.Title>

                {hover &&
                        <Button
                          variant="primary"
                          onClick={() => nominate(movie.imdbID,movie.Title)}>
                          nominate
                        </Button>
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

                <MyVerticallyCenteredModal
                    show={nominationLimitModal}
                    onHide={() => setNominationLimitModal(false)}
                />

            )}

            {lastNominationModal &&(

                <LastNominationModal
                show={lastNominationModal}
                onHide={() => setLastNominationModal(false)}
            />
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
                <Nomination user={props.user} nominations={nominations} setNominations={setNominations} setShowAlert={setShowAlert} showAlert={showAlert}/>
            </Col>

            <Col xs={12} md={9}>
                {generateMovieCards()}
            </Col>

            </Row>


        </React.Fragment>
    );
}

{/* <Row gutter={16} type="flex" justify="center">
{ loading &&
    <Loader />
}

{ error !== null &&
    <div>
        <Alert message={error} type="error" />
    </div>
}

{ data !== null && data.length > 0 && data.map((result, index) => (
    {generateMovieCards()}
))}
</Row> */}