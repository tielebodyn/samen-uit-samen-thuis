/**
 * imports
 */
import {
    routes
} from "../core/consts.js";
import setProfileImage from "../helpers/setProfileImage.js";
import showError from "../helpers/showError.js"
import onAuthStateChanged from "../auth/onAuthStateChanged.js";
import {
    initFirebase
} from "../core/firebase.js"
import {
    displayImage,
    uploadedImageFile
} from "../helpers/displayImage.js";
import getter from "../helpers/firebaseActions/getter.js";

/**
 * initialize additional info page
 */
const initEditProfile = async () => {
    initFirebase();
    // get html buttons
    const saveChangesBtn = document.getElementById('save-changes__button')
    const arrowBackBtn = document.getElementById('arrowBackBtn')
    // event listeners
    saveChangesBtn.addEventListener('click', saveChanges)
    arrowBackBtn.addEventListener('click', () => location.replace(routes.dashboard))
    // when user state changed
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        setProfileImage('profileImageEdit', false)
        showUserInfo()
    });
    displayImage('profileImageEdit', 'chooseFileEdit')
}
/**
 * show user info
 */
const showUserInfo = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    let firstNameInput = document.getElementById('firstNameEdit')
    const usernameInput = document.getElementById('usernameEdit')
    let lastNameInput = document.getElementById('lastNameEdit')
    let phoneInput = document.getElementById('phoneEdit')
    const userDoc = await db.collection("users").doc(user.uid).get()
    const docData = await userDoc.data()
    usernameInput.value = docData.username;
    firstNameInput.value = docData.firstName;
    lastNameInput.value = docData.lastName;
    phoneInput.value = docData.phone
}
/**
 * get input from input fields
 */
const saveChanges = async () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    const firstNameInput = document.getElementById('firstNameEdit').value
    const usernameInput = document.getElementById('usernameEdit').value
    const lastNameInput = document.getElementById('lastNameEdit').value
    const phoneInput = document.getElementById('phoneEdit').value
    const {
        serverTimestamp
    } = firebase.firestore.FieldValue;
    if (firstNameInput && lastNameInput && phoneInput) {
        (async () => {
            try {
                let fileName;
                if (uploadedImageFile) fileName = uploadedImageFile.name
                // store in firebase storage
                if (uploadedImageFile) await firebase.storage().ref(`profileImages/${fileName}`).put(uploadedImageFile)
                // get image URL
                let profilePictureUrl;
                if (uploadedImageFile) profilePictureUrl = await firebase.storage().ref(`profileImages/${fileName}`).getDownloadURL()
                if (!profilePictureUrl) {
                    const userDoc = await getter({
                        collection: 'users',
                        docId: user.uid
                    })
                    const firebaseImg = userDoc.profileImageURL
                    if (firebaseImg) profilePictureUrl = firebaseImg
                    if (!firebaseImg) profilePictureUrl = false

                }
                await db.collection("users").doc(user.uid).set({
                    email: user.email,
                    username: usernameInput,
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    phone: phoneInput,
                    createdOn: serverTimestamp(),
                    profileImageURL: profilePictureUrl,
                }, {
                    merge: true
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
export default initEditProfile