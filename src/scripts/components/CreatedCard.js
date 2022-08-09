import Elements from "../lib/Elements";

const CreatedCard = (docData) => {
const divWrapper = Elements.createDiv({htmlClass1:'card'})
divWrapper.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('${docData.eventImageURL}')`

const divFlexBetween = Elements.createDiv({htmlClass1:'flex-column-between', id:'divFlexBetween'})
const divFlexBetween2 = Elements.createDiv({htmlClass1:'flex-column-between'})
divWrapper.append(divFlexBetween, divFlexBetween2)

const title = Elements.createHeader({size:'h2', textContent:docData.title, id:'cardTitle', htmlClass1:"cardTitle"})
const adressWrapper = Elements.createDiv({})
divFlexBetween.append(title,adressWrapper)

const adress  = Elements.createParagraph({textContent:`${docData.street}, ${docData.streetNumber} ${docData.city}`})
const discussionButton  = Elements.createButton({textContent:'discussion', id:"discussion-button"})
adressWrapper.append(adress, discussionButton)

const tag = Elements.createParagraph({textContent:docData.tag, htmlClass1:'card__tag'})
const divFlexCenter = Elements.createDiv({htmlClass1:'flex-center'})
divFlexBetween2.append(tag, divFlexCenter)

const users = Elements.createParagraph({textContent: docData.acceptedUsers.length.toString()})
const userIcon = Elements.createImage({src:'/user_icon.281af12d.svg', alt:'user icon'})
divFlexCenter.append(users, userIcon)

return divWrapper
}
export default CreatedCard