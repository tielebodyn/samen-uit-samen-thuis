/**
 * imports
 */
import {
    routes
} from "../core/consts.js";
import {
    initFirebase
} from "../core/firebase.js";
import loginWithGoogle from "../auth/login/loginWithGoogle.js";
import loginWithFacebook from "../auth/login/loginWithFacebook.js";
import loginWithEmail from "../auth/login/loginWithEmail.js";
import checkUserData from "../auth/checkUserData.js";

/**
 * initialize login page
 */
const initLogin = async () => {
    // initialize firebase
    initFirebase()
    // if user exists redirect to dashboard
    checkUserData()
    // get html elements
    const loginBtn = document.getElementById('login-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const buttonLoginGoogle = document.getElementById('btn-login-google');
    const buttonLoginFacebook = document.getElementById('btn-login-facebook');
    // add event listeners to buttons 
    signUpBtn.addEventListener('click', () => location.replace(routes.register));
    loginBtn.addEventListener('click', loginWithEmail);
    buttonLoginGoogle.addEventListener('click', loginWithGoogle);
    buttonLoginFacebook.addEventListener('click', loginWithFacebook);
}

export default initLogin