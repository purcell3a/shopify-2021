
//  will show this page if user returns and has submitted nominations

function UserNominations({user}) {

    const [movies, setMovies] = React.useState([])

    React.useEffect(() => {
        let data = {'user_id' : user.id}
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

    <Row>
        {generateMovieCards()}
    </Row>
    );
}