import {
    MAPBOX_TOKEN,
    routes
} from "../core/consts";
import {
    initFirebase
} from "../core/firebase";
import getCurrentTime from "../helpers/getCurrentTime";
import logout from "../helpers/logout";
import setProfileImage from "../helpers/setProfileImage";
import Elements from "../lib/Elements";
import DetailPage from "../lib/pages/DetailPage"
const initDetailPage = (navigoData) => {
    // init firebase
    initFirebase()
    // wait for auth to initialize
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        firebaseUser && checkUserData(firebaseUser)
        loadDetailData(navigoData.id)
    })
}
/*
 * create map
 */
const createMap = async (eventId) => {
    const live = await isLive(eventId)
    if (live) {
        const succes = (pos) => {
            const coords = pos.coords;
            const long = coords.longitude;
            const lat = coords.latitude
            mapboxgl.accessToken = MAPBOX_TOKEN;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [long, lat],
                zoom: 11
            })
            const marker = new mapboxgl.Marker({
                    color: "green",
                    draggable: true
                }).setLngLat([long, lat])
                .addTo(map);
        }
        const error = (e) => {
            console.log("❌" + e)
        }
        navigator.geolocation.getCurrentPosition(succes, error, {
            enableHighAccuracy: true
        })
    }

}
/**
 * check is current event is live
 */
const isLive = async (eventId) => {

    let isLive = false;
    const db = firebase.firestore()
    const event = await db.collection('events').doc(eventId).get();
    const time = new Date(getCurrentTime());
    const docData = event.data();

    const {
        startDate,
        endDate
    } = docData;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (time >= startDateObj && time <= endDateObj) {
        isLive = true
    }
    return isLive
}
/**
 * remove event
 */
const removeEvent = async (data) => {
    const db = await firebase.firestore()
    await db.collection('events').doc(data.id).delete()
    location.replace(routes.dashboard)
}
/**
 * check if user has created the event
 */
const isOwner = async (data) => {
    try {
        const db = await firebase.firestore()
        const eventDoc = await db.collection("events").doc(data).get();
        const eventUserId = eventDoc.data().userId
        const userId = firebase.auth().currentUser.uid
        if (userId === eventUserId) return true
        if (userId !== eventUserId) return false
    } catch (e) {
        console.log(e)
    }
}
/**
 * load detail data
 */
const loadDetailData = async (navigoData) => {
    const owner = await isOwner(navigoData)
    const db = firebase.firestore()
    const doc = await db.collection("events").doc(navigoData).get();
    const docData = await doc.data()
    const live = await isLive(navigoData)
    // load detail page with data
    DetailPage(owner, live, docData)
    // set profile image
    setProfileImage('profileImage', true)
    const {
        invitedUsers,
        acceptedUsers
    } = docData

    /**
     * get users 
     */
    const getUsers = async (arr) => {
        arr.forEach(async (item) => {
            const doc = await db.collection('users').doc(item).get();
            const docData = doc.data();
            const wrapper = document.getElementById('userListWrapper');
            const div = Elements.createDiv({
                htmlClass1: 'listed-user'
            })
            const flexDiv = Elements.createDiv({
                htmlClass1: 'flex',
                id: 'profileImageParent'
            })
            const img = Elements.createImage({
                htmlClass1: 'profile-image--nohover',
                alt: 'profile image',
                src: docData.profileImageURL || require('../../images/default_profile_image.png')
            })
            const p = Elements.createParagraph({
                textContent: docData.email
            })
            div.append(flexDiv)
            flexDiv.append(img, p)
            wrapper.append(div)
        });
    }

    getUsers(invitedUsers)
    getUsers(acceptedUsers)
    document.getElementById('acceptedUsersBtn').addEventListener('click', () => {
        document.getElementById('userListWrapper').innerHTML = ''
        acceptedUsers && getUsers(acceptedUsers)
    })
    document.getElementById('invitedUsersBtn').addEventListener('click', () => {
        document.getElementById('userListWrapper').innerHTML = ''
        invitedUsers && getUsers(invitedUsers)
    })

    document.getElementById('allUsersBtn').addEventListener('click', () => {
        document.getElementById('userListWrapper').innerHTML = ''
        invitedUsers && getUsers(invitedUsers)
        acceptedUsers && getUsers(acceptedUsers)
    })

    // get html elements
    const arrowBack = document.getElementById('arrowBackBtn')
    let logoutBtn = document.getElementById('logout-btn');
    const inviteUserBtn = document.getElementById('inviteUserBtn')
    const removeEventBtn = document.getElementById('remove-event-btn')
    const editEventBtn = document.getElementById('edit-event-btn')
    const meldetBtn = document.getElementById('meldetBtn')


    // add events to buttons
    owner && removeEventBtn.addEventListener('click', () => removeEvent(navigoData))
    owner && inviteUserBtn.addEventListener('click', () => inviteUser(navigoData))
    owner && editEventBtn.addEventListener('click', () => location.replace(`${routes.editEvent}/${navigoData}`))
    meldetBtn.addEventListener('click', () => location.replace(routes.meldet))
    arrowBack.addEventListener('click', back)
    logoutBtn.addEventListener('click', logout)
    createMap(navigoData)
  

}
/**
 * invite user
 */
const inviteUser = async (navigoData) => {
    const db = firebase.firestore()
    const inputUser = prompt('email of user')
    const invitedUser = await db.collection("users").where("email", "==", inputUser.toLowerCase()).get()

    let userInvited;
    invitedUser.forEach(user => {
        userInvited = user
    });
    if (!inputUser) return null
    if (!userInvited) return alert('user not found')
    const userData = userInvited.data()
    if (!userData.invitedEvents) await db.collection("users").doc(userInvited.id).set({
        invitedEvents: [navigoData]
    }, {
        merge: true
    });
    if (userData.invitedEvents) await db.collection("users").doc(userInvited.id).set({
        invitedEvents: [...userData.invitedEvents, navigoData]
    }, {
        merge: true
    });

    const doc = await db.collection("events").doc(navigoData).get();
    const docData = doc.data()
    const invitedUsers = docData.invitedUsers
    await db.collection("events").doc(navigoData).set({
        invitedUsers: [...invitedUsers, userInvited.id]
    }, {
        merge: true
    });
}
/**
 * go back to dashboard
 */
const back = () => {
    location.replace(routes.dashboard)
}


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

/**
 * when user is logged in 
 */
const onAuthStateChanged = (firebaseUser) => {
    if (!firebaseUser) location.replace(routes.index)
}


export default initDetailPage