import { routes } from "../core/consts"

/**
 * got to login when user is not logged in
 */
const onAuthStateChanged = (firebaseUser) => {
    if (!firebaseUser) location.replace(routes.index)
}

export default onAuthStateChanged