import showError from "../../helpers/showError.js";
import checkUserTable from "../checkUserTable.js";

/**
 *  login with facebook 
 */
const loginWithFacebook = async (e, ) => {
    e.preventDefault()
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        await firebase.auth().signInWithPopup(provider)
        checkUserTable()
    } catch (e) {
        showError({
            message: `error: ${e}`
        })
    }
}

export default loginWithFacebook