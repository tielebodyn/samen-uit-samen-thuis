import InvitedCard from "../components/InvitedCard";
import getter from "../helpers/firebaseActions/getter";
import acceptEvent from "./acceptEvent";
import denyEvent from "./denyEvent";

/**
 * get events where user is invited
 */
 const getInvitedEvents = async () => {
    const user = firebase.auth().currentUser;
    try {
        const docData = await getter({
            collection: 'users',
            docId: user.uid
        })
        let invitedEvents;
        if (docData.invitedEvents)
            invitedEvents = docData.invitedEvents
        invitedEvents && invitedEvents.forEach(async (eventId) => {
            const eventsDocData = await getter({
                collection: 'events',
                docId: eventId
            })
            const cardParent = document.getElementById('dashboard-cards-wrapper');
            const {
                divWrapper,
                acceptImg,
                denyImg
            } = InvitedCard(eventsDocData, eventId)
            cardParent.append(divWrapper)
            acceptImg.addEventListener('click', () => acceptEvent(eventId, user.uid))
            denyImg.addEventListener('click', () => denyEvent(eventId, user.uid))

        });
    } catch (e) {
        console.log(e)
    }
}

export default getInvitedEvents