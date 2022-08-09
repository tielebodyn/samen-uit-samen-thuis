import { basePath, routes } from "../../core/consts.js";
import showError from "../../helpers/showError.js";

/**
 *  login with email and password
 */
 const loginWithEmail = async (e) => {
    e.preventDefault()
    let passwordInput = document.getElementById('password__input').value;
    let emailInput = document.getElementById('email__input').value;
    e.preventDefault()
    if (passwordInput && emailInput) {
        try {
            await firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput);
            location.replace(routes.dashboard)
        } catch (e) {
            showError(e)
        }
    } else {
        showError({
            message: 'all fields are required'
        })
    }
}

export default loginWithEmail