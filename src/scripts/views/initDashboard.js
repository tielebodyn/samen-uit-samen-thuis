import {
    routes
} from "../core/consts.js";
import logout from "../helpers/logout.js";
import setProfileImage from "../helpers/setProfileImage.js";
import {
    initFirebase
} from "../core/firebase.js";
import getInvitedEvents from "../dashboardActions/getInvitedEvents.js";
import getCreatedEvents from "../dashboardActions/getCreatedEvents.js";
import getLiveEvents from "../dashboardActions/getLiveEvents.js";
import checkUserData from "../helpers/checkUserData.js";
import onAuthStateChanged from "../helpers/onAuthStateChanged.js";
import getAcceptedEvents from "../dashboardActions/getAcceptedEvents.js";



// initialize dashboard
const initDashboard = () => {
    initFirebase()
    // get html buttons
    let logoutBtn = document.getElementById('logout-btn');
    let newEventBtn = document.getElementById('new-event-button');
    // add event listeners to buttons
    logoutBtn.addEventListener('click', logout)
    newEventBtn.addEventListener('click', newEvent)
    // when firebase auth is initialized
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        firebaseUser && checkUserData(firebaseUser)
        firebaseUser && setProfileImage('profileImage', true)
        firebaseUser && getLiveEvents()
        firebaseUser && getAcceptedEvents()
        firebaseUser && getCreatedEvents()
        firebaseUser && getInvitedEvents()
        document.getElementById('createdBtn').addEventListener('click', () => emptyWrapper(getCreatedEvents))
        document.getElementById('acceptedBtn').addEventListener('click', () => emptyWrapper(getAcceptedEvents))
        document.getElementById('allBtn').addEventListener('click', () => emptyWrapper(getAllEvents))
        document.getElementById('invitedBtn').addEventListener('click', () => emptyWrapper(getInvitedEvents))
    })
}
const getAllEvents = () => {
    getLiveEvents()
    getAcceptedEvents()
    getCreatedEvents()
    getInvitedEvents()
}
const emptyWrapper = async (func) => {
document.getElementById('dashboard-cards-wrapper').innerHTML = ''
await func()
}
const newEvent = () => {
    location.replace(routes.newEvent)
}

// init when page is loaded
export default initDashboard