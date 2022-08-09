import showError from "../../helpers/showError.js"
import checkUserTable from "../checkUserTable.js"

/**
 * register with email and password
 */
const register = async (e) => {
    e.preventDefault()
    let passwordInput = document.getElementById('password__input').value;
    let emailInput = document.getElementById('email__input').value;
    if (emailInput && passwordInput) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(emailInput, passwordInput)
            checkUserTable()
        } catch (e) {
            console.log(e)
            showError(e)
        }
    } else {
        showError({
            message: 'fill in the fields'
        })
    }

}

export default register