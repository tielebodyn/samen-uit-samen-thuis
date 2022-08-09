import convertDate from "../../helpers/convertDate"
import ArrowBack from "../components/ArrowBack"
import Header from "../components/Header"
import Elements from "../Elements"

const DetailPage = (owner, live, docData) => {
    document.title = 'SUST | Detail page'
    const createdTime = convertDate(docData.createdOn.toDate().toString())
    const editedTime = convertDate(docData.editedOn.toDate().toString())
    const body = document.body
    const header = Header()
    body.append(header)

    const arrowBackBtn = ArrowBack()
    body.append(arrowBackBtn)

    const detailWrapper = Elements.createDiv({
        htmlClass1: 'detailWrapper'
    })
    body.append(detailWrapper)
    if (owner) {
        const wrapper = Elements.createDiv({
            htmlClass1: 'event-btns-wrapper'
        })
        const editBtn = Elements.createButton({
            textContent: 'edit event',
            htmlClass1: 'secondary-btn',
            id: 'edit-event-btn'
        })
        const deleteBtn = Elements.createButton({
            textContent: 'delete event',
            htmlClass1: 'panic-btn',
            id: 'remove-event-btn'
        })
        wrapper.append(editBtn, deleteBtn)
        detailWrapper.append(wrapper)


    }

    if (live) {
        const mapWrapper = document.createElement('div');
        mapWrapper.id = 'map'
        mapWrapper.style.width = '400px'
        mapWrapper.style.height = '300px'
        mapWrapper.style.margin = '20px 0px'
        detailWrapper.append(mapWrapper)
    }
    const meldetBtn = Elements.createButton({
        htmlClass1:'secondary-btn',
        textContent:'meldet',
        id:'meldetBtn'
    })
    const divWrapper = Elements.createDiv({
        htmlClass1: 'card'
    })
    divWrapper.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${docData.eventImageURL})`
    detailWrapper.append(divWrapper)
    const divFlexBetween = Elements.createDiv({
        htmlClass1: 'flex-end'
    })
    divWrapper.append(divFlexBetween)
    detailWrapper.append(meldetBtn)
    const title = Elements.createHeader({
        size: 'h1',
        textContent: docData.title
    })
    divFlexBetween.append(title)



    const detailItemWrapper = Elements.createDiv({
        htmlClass1: 'detailItemWrapper'
    })
    detailWrapper.append(detailItemWrapper)
    const detailLabel = Elements.createParagraph({
        htmlClass1: 'detailLabel',
        textContent: 'details'
    })
    detailItemWrapper.append(detailLabel)
    const createDetailElement = (image, text) => {
        const div = Elements.createDiv({
            htmlClass1: 'detailItem'
        })
        const img = Elements.createImage({
            htmlClass1: 'detailItemImage',
            src: image
        })
        const p = Elements.createParagraph({
            htmlClass1: 'detailItemParagraph',
            textContent: text
        })
        div.append(img, p)
        return div
    }
    const item1 = createDetailElement('/detail_icon.8086ff2f.svg', docData.description)
    const item2 = createDetailElement('/location_icon.4b6e82f0.svg', `${docData.street}, ${docData.streetNumber} ${docData.city}`)
    const item3 = createDetailElement('/time_icon.7f1ad3f2.svg', `starts: ${docData.startDate.replace('T', ' ')} \n ends: ${docData.endDate.replace('T', ' ')}`)
    const item4 = createDetailElement('/edit_icon.bff93f3d.svg', `created: ${createdTime} \n edited: ${editedTime}`)
    detailItemWrapper.append(item1, item2, item3, item4)

    if (owner) {
        const addImg = Elements.createImage({
            src: '/add_round.61530307.png'
        })
        const inviteUserBtn = Elements.createButton({
            htmlClass1: 'new-event-btn',
            id: 'inviteUserBtn',
            textContent: 'invite user',
            child: addImg,
            add: 'true'
        })
        detailWrapper.append(inviteUserBtn)
    }


    const userFilterWrapper = Elements.createDiv({
        htmlClass1: 'user_filter'
    })
    const textBtn3 = Elements.createButton({
        htmlClass1: 'text-btn',
        textContent: 'all',
        id: 'allUsersBtn'
    })
    const textBtn1 = Elements.createButton({
        htmlClass1: 'text-btn',
        textContent: 'invited',
        id: 'invitedUsersBtn'
    })
    const textBtn2 = Elements.createButton({
        htmlClass1: 'text-btn',
        textContent: 'accepted',
        id: 'acceptedUsersBtn'
    })
    userFilterWrapper.append(textBtn3, textBtn1, textBtn2)
    detailWrapper.append(userFilterWrapper)


    const userListWrapper = Elements.createDiv({
        htmlClass1: 'userListWrapper',
        id: 'userListWrapper'
    })
    detailWrapper.append(userListWrapper)
}



export default DetailPage