import Elements from "../lib/Elements";

const InvitedCard = (docData, eventId) => {

const divWrapper = Elements.createDiv({htmlClass1:'card'})
divWrapper.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('${docData.eventImageURL}')`
divWrapper.id = `invited-${eventId}`
const divFlexBetween = Elements.createDiv({htmlClass1:'flex-column-between'})
const divFlexBetween2 = Elements.createDiv({htmlClass1:'flex-column-between'})
divWrapper.append(divFlexBetween, divFlexBetween2)

const title = Elements.createHeader({size:'h2', textContent:docData.title})
const adressWrapper = Elements.createDiv({})
divFlexBetween.append(title,adressWrapper)

const acceptImg  = Elements.createImage({src:'/accept_button.9c2f63d9.svg', alt:'accept button'})
const denyImg  = Elements.createImage({src:'/deny_button.a480772f.svg', alt:'deny button'})

adressWrapper.append(acceptImg, denyImg)

const tag = Elements.createParagraph({textContent:docData.tag, htmlClass1:'card__tag'})
const divFlexCenter = Elements.createDiv({htmlClass1:'flex-center'})
divFlexBetween2.append(tag, divFlexCenter)

const users = Elements.createParagraph({textContent: docData.acceptedUsers.length.toString()})
const userIcon = Elements.createImage({src:require('../../images/user_icon.svg'), alt:'user icon'})
divFlexCenter.append(users, userIcon)

return {divWrapper, acceptImg, denyImg}

}
export default InvitedCard