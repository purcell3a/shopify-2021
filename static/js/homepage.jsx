// "use strict";
function Homepage(props) {

    const [search, setSearch] = React.useState('disney')
    const [movies, setMovies] = React.useState([])
    const history = useHistory()

    React.useEffect(() => {
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=e67626fa`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setMovies(data.Search))
    },[search])


    function handleStarClick(imdbID,type,year,title,poster ){
        let user_id = props.user? props.user.id:alert('Please Log In To Nominate')
        let data = {'imdbID':imdbID,'user_id':user_id,'type':type,'year':year,'poster':poster,'title':title,'description':description}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {console.log(data)});
    }

    function movieModal(){
        console.log('this is not finished')
    }

    function generateMovieCards(){
        const cards = movies.map((movie,index) =>(

            <Card key={index} value={index}>

              <Card.Img variant="top"  src={movie.Poster}/>

              <Card.Body>

                  <Card.Title>
                    {/* <i className={product.product_favorite === 'True'?  "yellow fa fa-star": " white fa fa-star"} onClick={() => handleStarClick(movie.imdbID)}></i> */}
                    <i className="white fa fa-star" onClick={() => handleStarClick(movie.imdbID,movie.Type,movie.Year,movie.Title,movie.Poster)}></i>
                    <div className='truncate-description'>{movie.Title}</div>
                  </Card.Title>

                    <span>{movie.Year}</span>
                  <Button
                          variant="primary" onClick={() => movieModal()}>
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
                    <FormControl id='search-input'
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={value => setSearch(value)} />

                    <Button id='search-button'
                          variant="primary" onClick={() => handleSearchClick()}>
                          Search
                  </Button>

            </Row>

            <Row id='movie-row'>


            <Col xs={6} md={3}>
                <Nomination user={props.user}/>
            </Col>

            <Col xs={12} md={9}>
                {generateMovieCards()}
            </Col>

            </Row>


        </React.Fragment>
    );
}