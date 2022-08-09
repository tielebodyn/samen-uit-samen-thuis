import getter from "../helpers/firebaseActions/getter"

/**
 * accept event
 */
 const acceptEvent = async (eventId, userId) => {
    const db = firebase.firestore()
    const userDoc = await getter({
        collection: 'users',
        docId: userId
    })
    const eventDoc = await getter({
        collection: 'events',
        docId: eventId
    })
    const {
        invitedEvents,
        acceptedEvents
    } = userDoc
    const {acceptedUsers} = eventDoc
    const currentEventIndex = invitedEvents.indexOf(eventId)
    if (currentEventIndex != -1) {
        invitedEvents.splice(currentEventIndex, 1);
        const newAcceptedEvents = [...acceptedEvents, eventId]
        // add array of envited events to user doc (without the current accepted event)
        // add current accepted event to user doc
        await db.collection('users').doc(userId).set({
            invitedEvents: invitedEvents,
            acceptedEvents: newAcceptedEvents
        }, {
            merge: true
        })
        // add user to acceptedUsers doc
        const newAcceptedUsers = [...acceptedUsers, userId]
        await db.collection('events').doc(eventId).set({
            acceptedUsers: newAcceptedUsers
        }, {
            merge: true
        })
        document.getElementById(`invited-${eventId}`).remove()

    }
}

export default acceptEvent