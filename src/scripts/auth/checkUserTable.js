import {
    basePath, routes
} from "../core/consts.js";
import showError from "../helpers/showError.js";

const checkUserTable = async () => {
    try {
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        const docRef = await db.collection('users').doc(user.uid);
        const doc = await docRef.get();
        if (doc.exists) {
            location.replace(routes.dashboard)
        } else {
            location.replace(routes.additionalInfo)
        }
    } catch (e) {
        console.log(e)
    }
}

export default checkUserTable