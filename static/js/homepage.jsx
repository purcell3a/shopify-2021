// "use strict";
function Homepage(props) {

    const [apiKey, setApiKey] = React.useState('')
    const [search, setSearch] = React.useState('disney')
    const [movies, setMovies] = React.useState([])
    const history = useHistory()

    React.useEffect(() => {
        fetch('/api/apikey')
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setApiKey(data))
        apiCall();
    },[])

    function apiCall(){
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=e67626fa`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setMovies(data.Search))
    }

    function handleStarClick(imdbID){
        let user_id = props.user? props.user.id:alert('Please Log In To Nominate')
        let data = {'imdbID':imdbID,'user_id':user_id}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {console.log(data)
          apiCall()});
    }


    function generateMovieCards(){
        const cards = movies.map((movie,index) =>(

            <Card key={index} value={index}>

              <Card.Img variant="top"  src={movie.Poster}/>

              <Card.Body>

                  <Card.Title>
                    <i className="fa fa-star" onClick={() => handleStarClick(movie.imdbID)}></i>
                    <div className='truncate-description'>{movie.Title}</div>
                  </Card.Title>

                  {/* <small>{movie.Type}</small> */}

                    {/* <Card.Text className='truncate-description'>
                      {movie.Year}
                    </Card.Text> */}

                  <Button
                          variant="primary" onClick={() => apiCall()}>
                          More Info
                  </Button>

              </Card.Body>

            </Card>

          ))
          return cards
      }


    return (

        <React.Fragment>

            <Row id='search-row'>
                    <FormControl type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={value => setSearch(value)} />
                    
                    <Button className="more-info-button"
                          variant="primary" onClick={() => handleSearchClick()}>
                          Search
                  </Button>

            </Row>

            <Row id='movie-row'>
                <Col sm={10} id='movie-col'>
                   {generateMovieCards()}
                </Col>

                <Col sm={2} id="nomination-column">
                    <Nomination />
                </Col>
            </Row>


        </React.Fragment>
    );
}