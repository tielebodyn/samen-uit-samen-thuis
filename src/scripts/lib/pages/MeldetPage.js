import ArrowBack from "../components/ArrowBack";
import Input from "../components/Input";
import Elements from "../Elements";

const MeldetPage = (categories) => {
    document.title = 'SUST | Meldet'
    const body = document.body;

    const arrowBackBtn = ArrowBack()
    body.append(arrowBackBtn)
    const title = Elements.createHeader({
        size: 'h1',
        textContent: 'meldet',
        id: 'meldet-title',
    })
    body.append(title)
    const inputValidation = Elements.createParagraph({
        htmlClass1: 'input__feedback',
        htmlClass2: 'hide',
        id: 'input-validation'
    })

    const meldetWrapper = Elements.createDiv({
        id: 'meldetWrapper'
    })
    body.append(meldetWrapper)

    const titleInput = Input({
        textContent: 'Title (or keywords)',
        inputId: 'titleInput',
        placeholder: 'title',
        inputType: 'text'
    })
    const adress = Input({
        textContent: 'adress',
        inputId: 'adressInput',
        placeholder: 'adress',
        inputType: 'text'
    })
    const description = Input({
        textContent: 'description',
        inputId: 'descriptionInput',
        placeholder: 'description',
        inputType: 'text'
    })

    const select = document.createElement('select');
    select.id = 'typeValue'
    const option0 = document.createElement('option');
    option0.innerText = 'type'
    option0.selected
    option0.hidden = true
    select.append(option0)

    categories.map((category) => {
        const option = document.createElement('option');
        option.innerText = category,
            option.value = category
        select.append(option)
    })

    const date = Input({
        textContent: 'date',
        inputId: 'dateInput',
        inputType: 'date'
    })
    const saveButton = Elements.createButton({
        htmlClass1: 'secondary-btn',
        id: 'sendEmailBtn',
        textContent: 'send'
    })

    meldetWrapper.append(inputValidation, titleInput, adress, description, select, date, saveButton)
}

export default MeldetPage