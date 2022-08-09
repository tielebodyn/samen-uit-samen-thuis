import showError from "../../helpers/showError.js";
import checkUserTable from "../checkUserTable.js";

/**
 * login with google
 */
 const loginWithGoogle = async (e) => {
    e.preventDefault();
    try{
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider)
    checkUserTable()
    }
    catch(e){
        showError({
            message: `error: ${e}`
        })
    }
}

export default loginWithGoogle