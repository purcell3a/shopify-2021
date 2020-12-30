// "use strict";
function Homepage(props) {

    const [apiKey, setApiKey] = React.useState([])
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

        fetch(`http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(data => setMovies(data.Search))
    }, [search]);


    return (

        <React.Fragment>

            <Row>
                <Col span={12} offset={6}>
                    <FormControl type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                                onChange={value => setSearch(value)} />
                    <Button variant="outline-success">Search</Button>
                </Col>
            </Row>

            <Row id='movie-row'>
                <Col sm={10} id='movie-col'>
                   movies go here
                </Col>

                <Col sm={2} id="nomination-column">
                    nominations go here
                </Col>
            </Row>


        </React.Fragment>
    );
}