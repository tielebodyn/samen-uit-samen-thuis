/**
 * imports
 */
import {
    routes
} from "../core/consts.js";
import showError from "../helpers/showError.js"
import onAuthStateChanged from "../auth/onAuthStateChanged.js";
import {
    initFirebase
} from "../core/firebase.js"
import {
    displayImage,
    uploadedImageFile
} from "../helpers/displayImage.js";


/**
 * initialize additional info page
 */
const initAdditionalInfo = async () => {
    initFirebase();
    // get html buttons
    const saveChangesBtn = document.getElementById('save-changes__button')
    // event listeners
    saveChangesBtn.addEventListener('click', saveChanges)
    // when user state changed
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        checkUserData()
    });
    displayImage('profileImageAdditionalInfo', 'chooseFileAdditional')
}


/**
 * check user data
 */
const checkUserData = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    try {
        const doc = await db.collection("users").doc(user.uid).get();
        const docData = await doc.data()
        if (docData) {
            location.replace(routes.dashboard)
        }
    } catch (e) {
        console.log(`error: ${e}`)
    }
}


/**
 * get input from input fields
 */
const saveChanges = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    const usernameInput = document.getElementById('usernameAdditional').value
    const firstNameInput = document.getElementById('firstNameAdditional').value
    const lastNameInput = document.getElementById('lastNameAdditional').value
    const phoneInput = document.getElementById('phoneAdditional').value
    const {
        serverTimestamp
    } = firebase.firestore.FieldValue;
    if (usernameInput && firstNameInput && lastNameInput && phoneInput) {
        (async () => {
            try {
                let fileName;
                if (uploadedImageFile) fileName = uploadedImageFile.name
                // store in firebase storage
                if (uploadedImageFile) await firebase.storage().ref(`profileImages/${fileName}`).put(uploadedImageFile)
                // get image URL
                let profilePictureUrl;
                if (uploadedImageFile) profilePictureUrl = await firebase.storage().ref(`profileImages/${fileName}`).getDownloadURL()
                await db.collection("users").doc(user.uid).set({
                    email: user.email,
                    username: usernameInput,
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    phone: phoneInput,
                    createdOn: serverTimestamp(),
                    profileImageURL: profilePictureUrl || false,
                    createdEvents: [],
                    invitedEvents: [],
                    acceptedEvents: [],
                })
                // redirect to dashboard
                location.replace(routes.dashboard)
            } catch (error) {
                showError({
                    message: `error: ${error}`
                })
            }
        })()
    } else {
        showError({
            message: 'all fields are required'
        })
    }
}
export default initAdditionalInfo