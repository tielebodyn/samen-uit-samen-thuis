/**
 * imports
 */

import LoginPage from "./lib/pages/LoginPage";
import Router from "./Router.js";
import RegisterPage from "./lib/pages/RegisterPage";
import Dashboard from "./lib/pages/Dashboard";
import EditProfile from "./lib/pages/EditProfile";
import AdditionalInfo from "./lib/pages/AdditionalInfo";
import NewEvent from "./lib/pages/NewEvent";
import initLogin from "./views/initLogin";
import initRegister from "./views/initRegister";
import initDashboard from "./views/initDashboard";
import initAdditionalInfo from "./views/initAdditionalInfo";
import initNewEvent from "./views/initNewEvent";
import initEditProfile from "./views/initEditProfile";
import initDetailPage from "./views/initDetailPage";
import initEditEvent from "./views/initEditEvent";
import initDiscussion from "./views/initDiscussion";
import initMeldetPage from "./views/initMeldetPage";

const initApp = () => {
    /**
     * routes
     */
    Router.getRouter().on('/', () => {
        LoginPage()
        initLogin()
    }).resolve()

    Router.getRouter().on('/register', () => {
        RegisterPage()
        initRegister()


    }).resolve()
    Router.getRouter().on('/dashboard', () => {
        Dashboard()
        initDashboard()
    }).resolve()

    Router.getRouter().on('/edit-profile', () => {
        EditProfile()
        initEditProfile()
    }).resolve()

    Router.getRouter().on('/additional-info', () => {
        AdditionalInfo()
        initAdditionalInfo()
    }).resolve()

    Router.getRouter().on('/new-event', () => {
        NewEvent()
        initNewEvent()
    }).resolve()

    Router.getRouter().on('detail/:id', (data) => {
       initDetailPage(data)
    }).resolve()

    Router.getRouter().on('edit-event/:id', (data) => {
        initEditEvent(data)
     }).resolve()
    Router.getRouter().on('discussion/:id', (data) => {
        initDiscussion(data)
     }).resolve()
    Router.getRouter().on('/meldet', (data) => {
        initMeldetPage()
     }).resolve()

}



window.addEventListener('load', initApp)