import {
    routes
} from "../core/consts";
import {
    initFirebase
} from "../core/firebase";
import checkUserData from "../helpers/checkUserData";
import {
    displayImage,
    uploadedImageFile
} from "../helpers/displayImage";
import getter from "../helpers/firebaseActions/getter";
import logout from "../helpers/logout";
import onAuthStateChanged from "../helpers/onAuthStateChanged";
import setProfileImage from "../helpers/setProfileImage";
import showError from "../helpers/showError";
import EditEvent from "../lib/pages/EditEvent";

const initEditEvent = (navigoData) => {
    // initialize firebase
    initFirebase();
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        firebaseUser && checkUserData(firebaseUser)
        const eventData = await getter({
            collection: ("events"),
            docId: navigoData.id
        })
        EditEvent(eventData)
        displayImage('eventImageAddNew', 'chooseFileNewEvent')
        setProfileImage('profileImage', true)
        // get hmtl btns
        const arrowBack = document.getElementById('arrowBackBtn')
        let logoutBtn = document.getElementById('logout-btn');
        const saveChangesBtn = document.getElementById('saveChanges')
        // add events
        saveChangesBtn.addEventListener('click', () => editEvent(navigoData))
        logoutBtn.addEventListener('click', logout)
        arrowBack.addEventListener('click', back)
    })
}
/**
 * go back to dashboard
 */
const back = () => {
    location.replace(routes.dashboard)
}

/**
 * check if user has created the event
 */
const isOwner = async (data) => {
    try {
        const db = await firebase.firestore()
        const eventDoc = await db.collection("events").doc(data.id).get();
        const eventUserId = eventDoc.data().userId
        const userId = firebase.auth().currentUser.uid
        if (userId === eventUserId) return true
        if (userId !== eventUserId) return location.replace(routes.dashboard)
    } catch (e) {
        console.log(e)
    }
}


/**
 * edit event
 */
const editEvent = (navigoData) => {

    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    //get input values
    const titleInput = document.getElementById('titleNewEvent').value
    const descriptioninput = document.getElementById('descriptionNewEvent').value
    const streetInput = document.getElementById('streetNewEvent').value
    const numberInput = document.getElementById('numberNewEvent').value
    const postalInput = document.getElementById('postalNewEvent').value
    const cityInput = document.getElementById('cityNewEvent').value
    const tagInput = document.getElementById('tagNewEvent').value
    const imagesrc = document.getElementById('eventImageAddNew').src
    const {
        serverTimestamp
    } = firebase.firestore.FieldValue;
    if (titleInput && descriptioninput && streetInput && numberInput && postalInput && cityInput && tagInput) {
        (async () => {
            try {
                let fileName;
                if (uploadedImageFile) fileName = uploadedImageFile.name
                // store in firebase storage
                if (uploadedImageFile) await firebase.storage().ref(`eventImages/${fileName}`).put(uploadedImageFile)
                // get image URL
                let eventImageURL;
                if (uploadedImageFile) eventImageURL = await firebase.storage().ref(`eventImages/${fileName}`).getDownloadURL()
                if (!uploadedImageFile) eventImageURL = imagesrc
                await db.collection("events").doc(navigoData.id).update({
                    userId: user.uid,
                    title: titleInput,
                    description: descriptioninput,
                    street: streetInput,
                    streetNumber: numberInput,
                    postalCode: postalInput,
                    city: cityInput,
                    tag: tagInput,
                    createdOn: serverTimestamp(),
                    editedOn: serverTimestamp(),
                    eventImageURL: eventImageURL
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
export default initEditEvent