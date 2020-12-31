function Nomination(props) {
    console.log('props',props.user)
    const [nominations, setNominations] = React.useState([])

    // React.useEffect(() => {
    //     let data = {'user_id' : props.user.id}
    //     fetch('/api/user-nominations' ,
    //     {method: "POST",  body: JSON.stringify(data),  headers: {'Content-Type': 'application/json'}})
    //     .then(response => response.json())
    //     .then(data => setNominations(data))
    //   }, []);

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
            <div>this is the nominations</div>
  
        </React.Fragment>
    );
}