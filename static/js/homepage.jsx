// "use strict";
//  ! maybe get rid of poster as well
function Homepage(props) {

    const [apiKey, setApiKey] = React.useState('')
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState('Batman')
    const [movies, setMovies] = React.useState([])
    const history = useHistory()


    React.useEffect(() => {
        fetch('/api/apikey')
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setApiKey(data))
        .then(api_call())
    },[])

    function api_call(){
        setLoading(true);
        setError(null);
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=e67626fa`)
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


    function handleStarClick(imdbID,year,title,poster ){
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

            <Card key={movie.Title + index} value={index}>

              <Card.Img variant="top"  src={movie.Poster}/>

              <Card.Body>

                  <Card.Title>
                    <i className="white fa fa-star" onClick={() => handleStarClick(movie.imdbID,movie.Year,movie.Title,movie.Poster)}></i>
                    <div className='truncate-description'>{movie.Title}</div>
                    <h6><small>{movie.Year}</small></h6>
                  </Card.Title>

                  <Button
                          variant="primary" onClick={() => movieModal()}>
                          Nominate
                  </Button>

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
                <Nomination user={props.user}/>
            </Col>

            <Col xs={12} md={9}>
                {generateMovieCards()}
            </Col>

            </Row>


        </React.Fragment>
    );
}