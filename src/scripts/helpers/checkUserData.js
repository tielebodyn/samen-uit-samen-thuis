import { routes } from "../core/consts";

/**
 * check user data
 */
 const checkUserData = async (firebaseUser) => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    try {
        if (firebaseUser) {
            const doc = await db.collection("users").doc(user.uid).get();
            const docData = await doc.data()
            if (!docData) {
                location.replace(routes.additionalInfo)
            }
        }
    } catch (e) {
        console.log(`error: ${e}`)
    }
}

export default checkUserData