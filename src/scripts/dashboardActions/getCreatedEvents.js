import CreatedCard from "../components/CreatedCard";
import { routes } from "../core/consts";
import getWhere from "../helpers/firebaseActions/getWhre";
import getAcceptedEvents from "./getAcceptedEvents";

/**
 * get events created by user
 */
 const getCreatedEvents = async () => {
    const user = firebase.auth().currentUser;
    try {
        const result = await getWhere({
            collection: 'events',
            doc: 'userId',
            docData: user.uid
        })
        result.forEach((data) => {
            const cardParent = document.getElementById('dashboard-cards-wrapper');
            const resultData = data.data
            const card = CreatedCard(resultData)
            cardParent.append(card)
            const title = card.children[0].children[0];
            title.addEventListener('click', () => {
                location.replace(`${routes.detail}/${data.id}`)
            })
            const discussionButton = card.children[0].children[1].children[1];
            discussionButton.addEventListener('click', () => 
            location.replace(`${routes.discussion}/${data.id}`))
        });
    } catch (e) {
        console.log(e)
    }
}

export default getCreatedEvents