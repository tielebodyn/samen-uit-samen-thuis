import ArrowBack from "../components/ArrowBack.js"
import Input from "../components/Input.js"
import Elements from "../Elements.js"

const RegisterPage = () => {
    document.title = 'SUST | Register'
    const body = document.body
    body.classList.add('register-page')

    const wrapperDiv = Elements.createDiv({
        htmlClass1: "bg-container"
    })
    body.appendChild(wrapperDiv)

    const contentWrapperDiv = Elements.createDiv({
        htmlClass1: "content-wrapper"
    })
    wrapperDiv.appendChild(contentWrapperDiv)

    const span1 = Elements.createSpan({});
    contentWrapperDiv.appendChild(span1)

    const arrowBackBtn = ArrowBack()
    span1.append(arrowBackBtn)
    const title = Elements.createHeader({
        size: 'h1',
        textContent: 'Sign Up!'
    })
    span1.appendChild(title)

    const loginWrapperDiv = Elements.createDiv({
        htmlClass1: 'login-wrapper'
    })
    span1.appendChild(loginWrapperDiv)

    const inputFeedbackParagraph = Elements.createParagraph({
        htmlClass1: 'input__feedback',
        htmlClass2: 'hide',
        id: "input-validation"
    })
    loginWrapperDiv.appendChild(inputFeedbackParagraph)


    const emailInput = Input({
        htmlFor: 'email',
        textContent: 'email',
        inputId: 'email__input',
        placeholder: 'john@smith.com',
        inputType: 'email'
    })
    const passwordInput = Input({
        htmlFor: 'password',
        textContent: 'password',
        inputId: 'password__input',
        placeholder: '************',
        inputType: 'password'
    })
    loginWrapperDiv.append(emailInput, passwordInput)

    const loginBtn = Elements.createButton({
        htmlClass1: 'primary-btn',
        id: 'btnRegister',
        textContent: 'register'
    })
    loginWrapperDiv.appendChild(loginBtn)

}

export default RegisterPage