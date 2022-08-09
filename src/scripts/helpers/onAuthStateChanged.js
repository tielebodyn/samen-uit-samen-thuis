import { routes } from "../core/consts";

/**
 * when user is logged in 
 */
 const onAuthStateChanged = (firebaseUser) => {
    if (!firebaseUser) location.replace(routes.index)
    let body = document.querySelector('body');
    body.classList.remove('hide')
}

export default onAuthStateChanged