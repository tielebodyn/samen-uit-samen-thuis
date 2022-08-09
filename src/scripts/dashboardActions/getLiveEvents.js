import LiveCard from "../components/LiveCard";
import { routes } from "../core/consts";
import getCurrentTime from "../helpers/getCurrentTime";

/**
 * get live events
 */
 const getLiveEvents = async () => {
    const db = firebase.firestore()
    const events = await db.collection('events').get();
    const time = new Date(getCurrentTime());
    events.forEach((event) => {
        //const events = await db.collection('events').doc(event.uid).get();
        const docData = event.data();
        const {startDate, endDate} = docData;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if(time >= startDateObj && time <= endDateObj){
            const cardParent = document.getElementById('dashboard-cards-wrapper');
            const card = LiveCard(docData)
            cardParent.append(card)
            card.addEventListener('click', () => location.replace(`${routes.detail}/${event.id}`))
        }
    })   
}
export default getLiveEvents