import { basePath, routes } from "../core/consts.js";

/**
 * show profile image from firestore
 */
 const setProfileImage = async (imgElementId, isClickable) => {
    try {
        const db = firebase.firestore()
        const user = await firebase.auth().currentUser;
        const doc = await db.collection("users").doc(user.uid).get();
        const docData = await doc.data()
        const profileImageElement = document.getElementById(imgElementId)
        if (isClickable) {
            profileImageElement.addEventListener('click', () => {
                location.replace(routes.editProfile)
            })
        }
        if (docData.profileImageURL) {
            profileImageElement.src = docData.profileImageURL
        } else {
            const defaultImageUrl = await firebase.storage().ref(`default_profile_image.png`).getDownloadURL()
            profileImageElement.src = defaultImageUrl
            console.log(defaultImageUrl)
        }

    } catch (e) {
        console.log(`error: ${e}`)
    }
}

export default setProfileImage