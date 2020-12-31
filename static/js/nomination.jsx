function Nomination(props) {

    const [nominations, setNominations] = React.useState([{'Title':'looks like you have none','imdbID':'none'}])

    React.useEffect(() => {
        let data = {'user_id' : 1}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => console.log(data))
      }, []);

      function handleStarClick(imdbID){
        let user_id = props.user.id
        let data = {'imdbID':imdbID,'user_id':user_id}
        fetch('/api/toggle-nominate',{method: "POST",  body: JSON.stringify(data),  headers: {
          'Content-Type': 'application/json'}} )
        .then(response => response.json())
        .then(data => {console.log(data)});
    }


    function generateNominationCards(){
        const cards = nominations.map((movie,index) =>(

            <div key={index} value={index}>

                {/* <i className={product.product_favorite === 'True'?  "yellow fa fa-star": " white fa fa-star"} onClick={() => handleStarClick(movie.imdbID)}></i> */}
                <i className="white fa fa-star" onClick={() => handleStarClick(movie.imdbID)}></i>
                <span className='truncate-description'>{movie.Title}</span>

            </div>

          ))
          return cards
      }
    return (

        <React.Fragment>
            <div id="nomination-div">
            {generateNominationCards()}
            </div>
        </React.Fragment>
    );
}