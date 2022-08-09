import Elements from "../Elements.js"

const Input = ({htmlFor, textContent, inputId, placeholder, inputType, value}) => {
    const div = Elements.createDiv({htmlClass1:'input'})
    const label = Elements.createLabel({htmlClass1:'input__label', htmlFor: htmlFor, textContent: textContent})
    const input = Elements.createInput({htmlClass1:'input__text', id:inputId, placeholder:placeholder, inputType:inputType, value:value})
    div.append(label, input)
    return div
}

export default Input