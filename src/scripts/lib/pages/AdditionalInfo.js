import Input from "../components/Input"
import Elements from "../Elements"

const AdditionalInfo = () => {
    document.title = 'SUST | Additional Info'
    const body = document.body
    body.classList.add('additional-info-wrapper')

    const inputValidation = Elements.createParagraph({htmlClass1:'input__feedback', htmlClass2:'hide', id:'input-validation'})
    const profileImgFrame = Elements.createImage({htmlClass1:'imageFrame', id:'profileImageAdditionalInfo', alt:'uploaded profile picture'})
    const ChooseFileBtn = Elements.createButton({htmlClass1:'primary-btn', id:'chooseFileAdditional', textContent:'choose file'})
    const inputUsername = Input({htmlClass1:'input__label', textContent:'username', inputId:'usernameAdditional', inputType:'text', placeholder:'johnsmith83'})
    const inputFirstname = Input({htmlClass1:'input__label', textContent:'first name', inputId:'firstNameAdditional', inputType:'text', placeholder:'John'})
    const inputLastname = Input({htmlClass1:'input__label', textContent:'last name', inputId:'lastNameAdditional', inputType:'text', placeholder:'Smith'})
    const inputPhone = Input({htmlClass1:'input__label', textContent:'phone', inputId:'phoneAdditional', inputType:'text', placeholder:'+32445820165'})
    const saveChangesBtn = Elements.createButton({htmlClass1:'secondary-btn', id:'save-changes__button', textContent:'save changes'})

    body.append(inputValidation, profileImgFrame, ChooseFileBtn, inputUsername, inputFirstname, inputLastname, inputPhone, saveChangesBtn)


}

export default AdditionalInfo