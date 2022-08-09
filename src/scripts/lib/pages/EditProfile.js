import ArrowBack from "../components/ArrowBack"
import Input from "../components/Input"
import Elements from "../Elements"

const EditProfile = () => {
    document.title = 'SUST | Edit Profile'
    const body = document.body
    body.classList.add('edit-profile-body')

    const arrowBackBtn = ArrowBack()
    body.append(arrowBackBtn)

    const editProfileWrapper = Elements.createDiv({
        htmlClass1: 'edit-profile-wrapper'
    })
    body.append(editProfileWrapper)

    const inputValidation = Elements.createParagraph({
        htmlClass1: 'input__feedback',
        htmlClass2: 'hide',
        id: 'input-validation'
    })
    const profileImgFrame = Elements.createImage({
        htmlClass1: 'imageFrame',
        id: 'profileImageEdit',
        alt: 'uploaded profile picture'
    })
    const ChooseFileBtn = Elements.createButton({
        htmlClass1: 'primary-btn',
        id: 'chooseFileEdit',
        textContent: 'choose file'
    })
    editProfileWrapper.append(inputValidation, profileImgFrame, ChooseFileBtn)
    const inputUsername = Input({
        htmlClass1: 'input__label',
        textContent: 'username',
        inputId: 'usernameEdit',
        inputType: 'text'
    })
    const inputFirstname = Input({
        htmlClass1: 'input__label',
        textContent: 'first name',
        inputId: 'firstNameEdit',
        inputType: 'text'
    })
    const inputLastname = Input({
        htmlClass1: 'input__label',
        textContent: 'last name',
        inputId: 'lastNameEdit',
        inputType: 'text'
    })
    const inputPhone = Input({
        htmlClass1: 'input__label',
        textContent: 'phone',
        inputId: 'phoneEdit',
        inputType: 'text'
    })
    editProfileWrapper.append(inputUsername, inputFirstname, inputLastname, inputPhone)

    const saveChangesBtn = Elements.createButton({
        htmlClass1: 'secondary-btn',
        id: 'save-changes__button',
        textContent: 'save changes'
    })
    editProfileWrapper.append(saveChangesBtn)

}

export default EditProfile