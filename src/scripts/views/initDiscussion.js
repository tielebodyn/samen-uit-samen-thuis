import {
    routes
} from "../core/consts"
import {
    initFirebase
} from "../core/firebase"
import checkUserData from "../helpers/checkUserData"
import getter from "../helpers/firebaseActions/getter"
import getCurrentTime from "../helpers/getCurrentTime"
import logout from "../helpers/logout"
import onAuthStateChanged from "../helpers/onAuthStateChanged"
import setProfileImage from "../helpers/setProfileImage"
import DiscussionPage from "../lib/pages/DiscussionPage"

const initDiscussion = (data) => {
    // init firebase
    initFirebase()
    // when auth is initialized
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        onAuthStateChanged(firebaseUser)
        firebaseUser && checkUserData(firebaseUser)
        // load discussion page with data
        loadDiscussionpage(data)
    })
}
/**
 * load discussion page with messages
 */
const loadDiscussionpage = async (navigoData) => {
    const db = firebase.firestore()
    const {
        id
    } = navigoData;
    console.log(navigoData.id)

    const docData = await getter({
        collection: "discussions",
        docId: id
    })
    DiscussionPage(docData)

    // get html elements
    setProfileImage("profileImage", true)
    const inputField = document.getElementById('discussionInput')
    const sendMessage = document.getElementById('discussionSendButton')
    const arrowBack = document.getElementById('arrowBackBtn')
    const logoutBtn = document.getElementById('logout-btn')
    //add event listener
    sendMessage.addEventListener('click', () => createMessage(navigoData, inputField.value))
    arrowBack.addEventListener('click', () => location.replace(`${routes.dashboard}`))
    logoutBtn.addEventListener('click', logout)

}
/**
 * function that created a message
 */
const createMessage = async (navigoData, inputFieldValue) => {
    try {
        if (!inputFieldValue) return null
        const db = firebase.firestore()
        const user = firebase.auth().currentUser;

        const {
            data
        } = navigoData;
        const docData = await getter({
            collection: "discussions",
            docId: data.id
        })
        const eventData = await getter({
            collection: "events",
            docId: data.id
        })
        const currentUser = await getter({
            collection: "users",
            docId: user.uid
        })
        const time = getCurrentTime()

        // new message created by user
        const message = {
            createdOn: time,
            message: inputFieldValue,
            username: currentUser.username
        }

        // if messages && doc exists -> set messages to current messages
        let Currentmessages;
        if (docData && docData.messages !== null) Currentmessages = docData.messages


        // if there are messages -> put current messages + new user message inside
        let uploadMessages
        if (Currentmessages && Currentmessages.length > 1) {
            // if message is longer then one
            uploadMessages = [...Currentmessages, message]
        } else if (Currentmessages) {
            // if message is 1
            uploadMessages = [Currentmessages, message]
        } else {
            // if no messages -> take users message
            uploadMessages = message
        }

        // upload message to firebase
        await db.collection("discussions").doc(data.id).set({
            messages: uploadMessages,
            title: eventData.title

        }, {
            merge: true
        })
        document.getElementById('discussionInput').value = ''

    } catch (e) {
        console.log('error' + e)
    }
}


export default initDiscussion