import Elements from "../lib/Elements"

const LiveCard = (docData) => {
const div = Elements.createDiv({htmlClass1:'live-card'})
div.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('${docData.eventImageURL}')`
const title = Elements.createHeader({size:'h2', textContent:docData.title})
const button = Elements.createButton({htmlClass1:'panic-btn', textContent:'help'})
div.append(title, button)
const cardParent = document.getElementById('dashboard-cards-wrapper');
cardParent.append(div)
return div
}

export default LiveCard