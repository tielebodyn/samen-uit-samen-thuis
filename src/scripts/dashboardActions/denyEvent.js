import getter from "../helpers/firebaseActions/getter"

const denyEvent = async (eventId, userId) => {
    const db = firebase.firestore()
    const userDoc = await getter({
        collection: 'users',
        docId: userId
    })
    const {
        invitedEvents
    } = userDoc
    const currentEventIndex = invitedEvents.indexOf(eventId)

    if (currentEventIndex != -1) {
        invitedEvents.splice(currentEventIndex, 1);
        // add array of envited events to user doc (without the current accepted event)
        // add current accepted event to user doc
        await db.collection('users').doc(userId).set({
            invitedEvents: invitedEvents,
        }, {
            merge: true
        })
        document.getElementById(`invited-${eventId}`).remove()

    }
}


export default denyEvent