import ArrowBack from "../components/ArrowBack"
import Header from "../components/Header"
import Input from "../components/Input"
import Elements from "../Elements"

const EditEvent = (data) => {
    document.title = 'SUST | Edit'
    const body = document.body
    //body.classList.add('')

    const header = Header()
    body.append(header)

    const arrowBackBtn = ArrowBack()
    body.append(arrowBackBtn)

    const main = document.createElement('main');
    main.classList.add('new-event-wrapper')
    body.append(main)

    const inputFeedbackParagraph = Elements.createParagraph({
        htmlClass1: 'input__feedback',
        htmlClass2: 'hide',
        id: "input-validation"
    })
    const title = Elements.createHeader({
        size: 'h1',
        textContent: 'new event'
    })
    const img = Elements.createImage({
        id: 'eventImageAddNew',
        alt: 'event image',
        src: data.eventImageURL
    })
    const chooseFileBtn = Elements.createButton({
        htmlClass1: 'primary-btn',
        id: 'chooseFileNewEvent',
        textContent: 'choose file'
    })
    const titleInput = Input({
        textContent: 'title',
        inputId: 'titleNewEvent',
        inputType: 'text',
        value: data.title
    })
    const descriptionInput = Input({
        textContent: 'description',
        inputId: 'descriptionNewEvent',
        inputType: 'text',
        value: data.description
    })
    const streetInput = Input({
        textContent: 'street',
        inputId: 'streetNewEvent',
        inputType: 'text',
        value: data.street
    })
    const streetNumberInput = Input({
        textContent: 'street number',
        inputId: 'numberNewEvent',
        inputType: 'number',
        value: data.streetNumber
    })
    const postalInput = Input({
        textContent: 'postal code',
        inputId: 'postalNewEvent',
        value: data.postalCode,
        inputType: 'number'
    })
    const cityInput = Input({
        textContent: 'city',
        inputId: 'cityNewEvent',
        value: data.city,
        inputType: 'text'
    })
    const tagSelect = document.createElement('select');
    tagSelect.value = 'value'
    tagSelect.setAttribute('id', 'tagNewEvent')
    const optionArray = [{
        text: data.tag,
        title: true
    }, {
        text: "♥️"
    }, {
        text: "🍸"
    }, {
        text: "🎁"
    }, {
        text: "🎊"
    }, {
        text: "🎬"
    }, {
        text: "🎄"
    }, {
        text: "🥳"
    }, {
        text: "🤝"
    }]
    optionArray.map((item) => {
        const {
            title,
            text
        } = item
        const option = document.createElement('option')
        if (title) {
            option.disabled = true,
                option.selected = true,
                option.hidden = false
            option.value = data.tag
        }
        if (!title) option.value = text
        option.innerText = text
        tagSelect.append(option)
    })
    const saveChangesBtn = Elements.createButton({
        htmlClass1: 'secondary-btn',
        id: 'saveChanges',
        textContent: 'create event'
    })
    main.append(inputFeedbackParagraph, title, img, chooseFileBtn, titleInput, descriptionInput, streetInput, streetNumberInput, postalInput, cityInput, tagSelect, saveChangesBtn)
}

export default EditEvent