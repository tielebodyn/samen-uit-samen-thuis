const Elements = {
    baseElement(element, htmlClass1 = null, htmlClass2 = null, id=null){
        const baseElement = document.createElement(element);
        htmlClass1 && baseElement.classList.add(htmlClass1)
        htmlClass2 && baseElement.classList.add(htmlClass2)
        id && baseElement.setAttribute("id", id)
        return baseElement
    },
    createHeader ({htmlClass1 = null, htmlClass2 = null, id=null, size, textContent}){
        const header = this.baseElement(size, htmlClass1, htmlClass2, id);
        header.innerText = textContent;
        return header
    },
    createDiv({htmlClass1 = null, htmlClass2 = null, id= null, textContent=null}){
        const div = this.baseElement('div', htmlClass1, htmlClass2, id)
        if(textContent) div.textContent = textContent
        return div
    },
    createParagraph({htmlClass1 = null, htmlClass2 = null, id=null, textContent = null, child = null}){
        const p = this.baseElement('p', htmlClass1, htmlClass2, id)
        if(textContent) p.innerText = textContent
        if(child) child.innerHTML = '<u> sign up </u>'
        child && p.append(child)
        return p 
    },
    createLabel({htmlClass1 = null, htmlClass2 = null, id=null, htmlFor=null, textContent}){
        const label = this.baseElement('label', htmlClass1, htmlClass2, id);
        if(htmlFor) label.htmlFor =  htmlFor
        label.innerText = textContent
        return label
    },
    createInput({htmlClass1 = null, htmlClass2 = null, id=null, placeholder=null, inputType, value=null}){
        const input = this.baseElement('input', htmlClass1, htmlClass2, id);
        if(placeholder) input.placeholder = placeholder
        input.type = inputType
        if(value) input.value = value
        return input
    },
    createButton({htmlClass1 = null, htmlClass2 = null, id=null, onClick = null, textContent, child, add = null}){
        const button = this.baseElement('button', htmlClass1, htmlClass2, id);
        onClick && button.addEventListener('click', () => onClick())
        if(!child) button.innerText = textContent
        if(child && !add) button.append(child, textContent)
        if(child && add) button.append(textContent, child)
        return button
    },
    createSpan({htmlClass1 = null, htmlClass2 = null, id=null}){
        const span = this.baseElement('span', htmlClass1 , htmlClass2, id);  
        return span
    },
    createImage({htmlClass1 = null, htmlClass2 = null, id=null, src, alt, onClick = null}){
        const image = this.baseElement('img', htmlClass1, htmlClass2, id);
        image.src = src
        image.alt = alt
        onClick && image.addEventListener('click', onClick)
        return image
    }
}
export default Elements