import ArrowBack from "../components/ArrowBack"
import Header from "../components/Header"
import Input from "../components/Input"
import Elements from "../Elements"

const NewEvent = () => {
    document.title = 'SUST | New Event'
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
        src: require('../../../images/event_image_default.jpg')
    })
    const chooseFileBtn = Elements.createButton({
        htmlClass1: 'primary-btn',
        id: 'chooseFileNewEvent',
        textContent: 'choose file'
    })
    const titleInput = Input({
        textContent: 'title',
        inputId: 'titleNewEvent',
        placeholder: 'my birthday',
        inputType: 'text'
    })
    const descriptionInput = Input({
        textContent: 'description',
        inputId: 'descriptionNewEvent',
        placeholder: 'it\'s gonna be a great party!',
        inputType: 'text'
    })
    const streetInput = Input({
        textContent: 'street',
        inputId: 'streetNewEvent',
        placeholder: 'kerkstraat',
        inputType: 'text'
    })
    const streetNumberInput = Input({
        textContent: 'street number',
        inputId: 'numberNewEvent',
        placeholder: '234',
        inputType: 'number'
    })
    const postalInput = Input({
        textContent: 'postal code',
        inputId: 'postalNewEvent',
        placeholder: '9000',
        inputType: 'number'
    })
    const cityInput = Input({
        textContent: 'city',
        inputId: 'cityNewEvent',
        placeholder: 'Ghent',
        inputType: 'text'
    })
    const startDateInput = Input({
        textContent: 'start date',
        inputId: 'startOnNewEvent',
        inputType: 'datetime-local',
        value:'2022-07-01T12:00'
    })
    const endDateInput = Input({
        textContent: 'end date',
        inputId: 'endOnNewEvent',
        inputType: 'datetime-local',
        value:'2022-07-01T12:00'
    })

    const tagSelect = document.createElement('select');
    tagSelect.setAttribute('id', 'tagNewEvent')
    const optionArray = [{
        text: "select a tag",
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
                option.hidden = true
        }
        if (!title) option.value = text
        option.innerText = text
        tagSelect.append(option)
    })
    const saveChangesBtn = Elements.createButton({
        htmlClass1: 'secondary-btn',
        id: 'createNewEvent',
        textContent: 'create event'
    })
    main.append(inputFeedbackParagraph, title, img, chooseFileBtn, titleInput, descriptionInput, streetInput, streetNumberInput, postalInput, cityInput, startDateInput, endDateInput, tagSelect, saveChangesBtn)
}

export default NewEvent