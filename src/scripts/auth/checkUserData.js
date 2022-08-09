import { basePath, routes } from "../core/consts.js"

/**
 * check user data
 */
 const checkUserData = async () => {
    const user = await firebase.auth().currentUser
    if(user)  location.replace(routes.dashboard)
}


export default checkUserData