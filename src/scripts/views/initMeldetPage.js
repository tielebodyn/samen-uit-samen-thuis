import {
    apiKey,
    MELDET_EMAIL,
    routes
} from "../core/consts"
import {
    initFirebase
} from "../core/firebase"
import getter from "../helpers/firebaseActions/getter"
import showError from "../helpers/showError"
import MeldetPage from "../lib/pages/MeldetPage"
//require('dotenv').config();
// error: non-js module file deprecated || when I install sendgrid
//import sgmail from "@sendgrid/mail"

const initMeldetPage = () => {
    initFirebase()
    getCategories()

}
/**
 * get categories from db and init meldet page
 */
const getCategories = async () => {
    const doc = await getter({
        collection: 'meldet',
        docId: 'meldet-categories'
    })
    MeldetPage(doc.categories)
    // gethmtl buttons
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const arrowBackBtn = document.getElementById('arrowBackBtn');
    sendEmailBtn.addEventListener('click', sendMail)
    arrowBackBtn.addEventListener('click', () => location.replace(routes.dashboard))
}
/**
 * send mail to meldet
 */
const sendMail = async () => {
    // get hmtl btns
    const titleInput = document.getElementById('titleInput').value;
    const descriptionInput = document.getElementById('descriptionInput').value;
    const adressInput = document.getElementById('adressInput').value;
    const typeValue = document.getElementById('typeValue').value;
    const dateInput = document.getElementById('dateInput').value;
    if (titleInput, descriptionInput, adressInput, typeValue, dateInput) {
        location.replace(routes.dashboard)
        /**
         * sendgrid email
         */
        // sgmail.setApiKey(process.env.SENDGRID_API_KEY);
        // const message = {
        //     to: MELDET_EMAIL,
        //     from: 'tielbody@student.arteveldehs.be',
        //     subject: 'MELDET REPORT',
        //     text: 'hello from sendgrid',
        //     html: '<h1>hello from sendgrid</h1>'
        // }
        // try {
        //     await sgmail.send(message)
        // } catch (e) {
        //     console.log(e)
        // }

    } else {
        showError({
            message: 'all fields are required'
        })
    }


}

export default initMeldetPage