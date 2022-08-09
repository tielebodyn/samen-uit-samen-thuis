/**
 * imports
 */
import register from "../auth/register/register.js";
import { routes } from "../core/consts.js";
import {
    initFirebase
} from "../core/firebase.js";

/**
 * initialize register page
 */
const initRegister = () => {
    // initialize firebase
    initFirebase()
    // get html  elements
    const btnRegister = document.getElementById('btnRegister');
    const arrowBack = document.getElementById('arrowBackBtn')
    arrowBack.addEventListener('click', () => {
        location.replace(routes.index)
    })
    // add event listeners to buttons
    btnRegister.addEventListener('click', register)
}
/**
 * init register function when page is loaded
 */
export default initRegister
