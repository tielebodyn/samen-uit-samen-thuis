import Header from "../components/Header";
import Elements from "../Elements";

const Dashboard = () => {
    document.title = 'SUST | Dashboard'
    const body = document.body
    //body.classList.add('hide')

    const header = Header()
    body.append(header)

    const main = document.createElement('main')
    main.classList.add('dashboard-wrapper')
    body.append(main)

    const section1 = Elements.createDiv({
        htmlClass1: 'dashboard-section1'
    })
    main.append(section1)
    const cardFilter = Elements.createDiv({
        htmlClass1: 'card-filter'
    })
    section1.append(cardFilter)

    const btnText = [{
        text: 'invites ●',
        id: 'invitedBtn'
    }, {
        text: 'all',
        id: 'allBtn'
    }, {
        text: 'accepted',
        id: 'acceptedBtn'
    }, {
        text: 'created',
        id: 'createdBtn'
    }]
    btnText.map((item) => {
        const btn = Elements.createButton({
            htmlClass1: 'text-btn',
            textContent: item.text,
            id: item.id
        })
        cardFilter.append(btn)
    })
    const addImg = Elements.createImage({
        src: '/add_round.61530307.png'
    })
    const createNewEventBtn = Elements.createButton({
        htmlClass1: 'new-event-btn',
        id: 'new-event-button',
        textContent: 'create new event',
        child: addImg,
        add: 'true'
    })
    section1.append(createNewEventBtn)

    const cardsWrapper = Elements.createDiv({
        htmlClass1: 'dashboard-cards-wrapper',
        id: 'dashboard-cards-wrapper'
    })
    main.append(cardsWrapper)




}

export default Dashboard;