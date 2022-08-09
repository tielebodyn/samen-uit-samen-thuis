const logout = (e) => {
    e.preventDefault()
    firebase.auth().signOut() 
}


export default logout