import Elements from "../Elements"
const Header = () => {
    const header = document.createElement('header')
    const img = Elements.createImage({htmlClass1:'profile-image', id:'profileImage', alt:"profile picture"})
    const title = Elements.createHeader({size:'h1', htmlClass1:'header--title', textContent:'Samen uit, \n samen thuis'})
    const logoutBtn = Elements.createButton({htmlClass1:'primary-btn', id:'logout-btn', textContent:'logout'})
    header.append(img, title, logoutBtn)
    return header
}

export default Header