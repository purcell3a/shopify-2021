function Nomination(props) {

    const [nominations, setNominations] = React.useState([])

    React.useEffect(() => {
        console.log('useeffect running')
        let data = {'user_id' : 1}
        fetch('/api/get-user-nominations' ,
        {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setNominations(data))
      }, []);

    // function get_user_nominations(){
    //     let data = {'user_id' : props.user.id}
    //     fetch('/api/get-user-nominations' ,
    //     {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    //     .then(response => response.json())
    //     .then(data => {console.log('DATA COMING FROM GET USER NOMINATIONS',data)
    //     setNominations(data)});
    //   }

    return (
  
        <React.Fragment>
            <div>{nominations}</div>
  
        </React.Fragment>
    );
}