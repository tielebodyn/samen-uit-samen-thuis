import Input from "../components/Input.js"
import Elements from "../Elements.js"

const LoginPage = () => {
    document.title = 'SUST | Login'
    const body = document.body
    body.classList.add('login-page')

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

    const title = Elements.createHeader({
        size: 'h1',
        textContent: 'samen uit, \n samen thuis'
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
        id: 'login-btn',
        textContent: 'login'
    })
    loginWrapperDiv.appendChild(loginBtn)

    const span2 = Elements.createSpan({});
    contentWrapperDiv.appendChild(span2)

    const externalProviderWrapper = Elements.createDiv({
        htmlClass1: 'external-provider-wrapper'
    })
    span2.appendChild(externalProviderWrapper);


    const googleImg = Elements.createImage({
        src:require('../../../images/logo_google.png'),
        alt: 'google logo'
    })
    const facebookImg = Elements.createImage({
        src:require('../../../images/logo_facebook.png'),
        alt: 'facebook logo'
    })
    const googleBtn = Elements.createButton({
        htmlClass1: 'external-login-btn',
        id: 'btn-login-google',
        textContent: 'login',
        child: googleImg
    })
    const facebookBtn = Elements.createButton({
        htmlClass1: 'external-login-btn',
        id: 'btn-login-facebook',
        textContent: 'login',
        child: facebookImg
    })
    externalProviderWrapper.append(googleBtn, facebookBtn)

    const signUpBtn = Elements.createButton({
        htmlClass1: 'bold',
        htmlClass2: 'sign-up',
        id: 'sign-up-btn',
        textContent: 'Sign up'
    })
    const signUp = Elements.createParagraph({
        htmlClass1: 'bold',
        textContent: `Don\'t have an account?`,
        child: signUpBtn
    })
    span2.append(signUp)
}

export default LoginPage