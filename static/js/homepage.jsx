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
    })

    React.useEffect(() => {

        fetch(`http://www.omdbapi.com/?s=${search}&apikey=e67626fa`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setMovies(data.Search))
    }, [search]);

    function generateMovieCards(){
        const cards = movies.map((movie,index) =>(

            <Card key={index} value={index}>

              <Card.Img variant="top"  src={movie.Poster}/>

              <Card.Body>

                  <Card.Title>
                    <i className="fa fa-star" onClick={() => handleFavoriteClick(product.product_id)}></i>
                    <div className='truncate-description'>{movie.Title}</div>
                  </Card.Title>

                  {/* <small>{movie.Type}</small> */}

                    {/* <Card.Text className='truncate-description'>
                      {movie.Year}
                    </Card.Text> */}

                  <Button className="more-info-button"
                          variant="primary" onClick={() => handleMoreInfoClick(movie.imdbID)}>
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