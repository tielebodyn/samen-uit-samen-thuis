import ArrowBack from "../components/ArrowBack"
import Header from "../components/Header"
import Elements from "../Elements"

const DiscussionPage = (data) => {
    document.title = 'SUST | Discussion'
    let messages;
    if (data) messages = data.messages
    let title
    if (data) title = data.title
    const body = document.body
    const header = Header()
    body.append(header)

    const arrowBackBtn = ArrowBack()
    body.append(arrowBackBtn)

    const detailWrapper = Elements.createDiv({
        htmlClass1: 'detailWrapper'
    })
    body.append(detailWrapper)

    if (title) {
        const Title = Elements.createHeader({
            textContent: title,
            size: 'h1',
            id: 'discussionTitle'
        })
        body.append(Title)
    }

    const chatBubbleWrapper = Elements.createDiv({
        htmlClass1: 'chatBubbleWrapper'
    })

    if (messages && messages.length > 1) {
        messages.map((message) => {

            const labelWrapper = Elements.createDiv({
                htmlClass1: 'labelWrapper'
            });
            const label = Elements.createLabel({
                htmlClass1: 'textBubbleLabel',
                textContent: message.username
            })
            const date = Elements.createParagraph({
                textContent: message.createdOn
            })
            labelWrapper.append(label, date)
            const chatBubble = Elements.createParagraph({
                textContent: message.message,
                htmlClass1: 'chatBubble'
            })
            chatBubbleWrapper.append(labelWrapper, chatBubble)
            body.append(chatBubbleWrapper)

        })
    } else if (messages) {
        const labelWrapper = Elements.createDiv({
            htmlClass1: 'labelWrapper'
        });
        const label = Elements.createLabel({
            htmlClass1: 'textBubbleLabel',
            textContent: messages.username
        })
        const date = Elements.createParagraph({
            textContent: messages.createdOn
        })
        labelWrapper.append(label, date)
        const chatBubble = Elements.createParagraph({
            textContent: messages.message,
            htmlClass1: 'chatBubble'
        })
        chatBubbleWrapper.append(labelWrapper, chatBubble)

    }
    body.append(chatBubbleWrapper)

    const inputWrapper = Elements.createDiv({})
    chatBubbleWrapper.append(inputWrapper)
    const chatInput = Elements.createInput({
        htmlClass1: 'input__text',
        inputType: 'text',
        htmlClass2: 'primary-btn',
        id: 'discussionInput'
    })
    inputWrapper.append(chatInput)

    const sendButton = Elements.createButton({
        textContent: 'send message',
        htmlClass1: 'primary-btn',
        id: 'discussionSendButton'
    })
    inputWrapper.append(sendButton)
}

export default DiscussionPage