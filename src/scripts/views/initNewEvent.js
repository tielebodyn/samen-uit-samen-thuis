
import { routes } from "../core/consts.js";
import {
    displayImage,
    uploadedImageFile
} from "../helpers/displayImage.js";
import setProfileImage from "../helpers/setProfileImage.js";
import showError from "../helpers/showError.js";
import {
    initFirebase
} from "../core/firebase.js"

const initNewEvent = () => {
    // init firebase
    initFirebase()
    // get html buttons
    const arrowBack = document.getElementById('arrowBackBtn');
    const createEventButton = document.getElementById('createNewEvent')
    // add events to buttons
    createEventButton.addEventListener('click', createEvent)
    arrowBack.addEventListener('click', back)
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        setProfileImage('profileImage', true)
        displayImage('eventImageAddNew', 'chooseFileNewEvent')
    })
}
/**
 * go back to dashboard
 */
const back = () => {
    location.replace(routes.dashboard)
}

/**
 * when user is logged in 
 */
const onAuthStateChanged = (firebaseUser) => {
    if (!firebaseUser) location.replace(routes.index)
    let body = document.querySelector('body');
    body.classList.remove('hide')
}
/**
 * create event
 */
const createEvent = () => {
    const db = firebase.firestore()
    const user = firebase.auth().currentUser;
    //get input values
    const titleInput  = document.getElementById('titleNewEvent').value
    const descriptioninput  = document.getElementById('descriptionNewEvent').value
    const streetInput  = document.getElementById('streetNewEvent').value
    const numberInput  = document.getElementById('numberNewEvent').value
    const postalInput  = document.getElementById('postalNewEvent').value
    const cityInput  = document.getElementById('cityNewEvent').value
    const tagInput  = document.getElementById('tagNewEvent').value
    const startDateInput  = document.getElementById('startOnNewEvent').value
    const endDateInput  = document.getElementById('endOnNewEvent').value
    const { serverTimestamp } = firebase.firestore.FieldValue;
    if (titleInput && descriptioninput && streetInput && numberInput && postalInput && cityInput && tagInput && startDateInput && endDateInput) {
        (async () => {
            try {
                let fileName;
                if (uploadedImageFile) fileName = uploadedImageFile.name
                // store in firebase storage
                if (uploadedImageFile) await firebase.storage().ref(`eventImages/${fileName}`).put(uploadedImageFile)
                // get image URL
                let eventImageURL;
                if (uploadedImageFile) eventImageURL = await firebase.storage().ref(`eventImages/${fileName}`).getDownloadURL()
                await db.collection("events").doc().set({
                    userId: user.uid,
                    title: titleInput,
                    description: descriptioninput,
                    street: streetInput,
                    streetNumber: numberInput,
                    postalCode: postalInput,
                    city: cityInput,
                    tag: tagInput,
                    invitedUsers: [],
                    acceptedUsers: [],
                    rejectedUsers: [],
                    startDate: startDateInput,
                    endDate: endDateInput,
                    createdOn: serverTimestamp(),
                    editedOn: serverTimestamp(),
                    eventImageURL: eventImageURL || require('../../images/event_image_default.jpg')
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

export default initNewEvent