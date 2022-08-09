import CreatedCard from "../components/CreatedCard";
import { routes } from "../core/consts";
import getter from "../helpers/firebaseActions/getter";

/**
 * get events that user had accerpted
 */
 const getAcceptedEvents = async () => {
    const user = firebase.auth().currentUser;
    try {
        const result = await getter({
            collection: 'users',
            docId: user.uid
        })
        const acceptedEvents = result.acceptedEvents
        acceptedEvents && acceptedEvents.forEach(async (eventId) => {
            const eventsDocData = await getter({
                collection: 'events',
                docId: eventId
            })
            const cardParent = document.getElementById('dashboard-cards-wrapper');
            const card = CreatedCard(eventsDocData)
            cardParent.append(card)
            const title = card.children[0].children[0];
            title.addEventListener('click', () => {
                location.replace(`${routes.detail}/${eventId}`)
            })
            const discussionButton = card.children[0].children[1].children[1];

            discussionButton.addEventListener('click', () => location.replace(`${routes.discussion}/${eventId}`))
        });
    } catch (e) {
        console.log(e)
    }
}
export default getAcceptedEvents