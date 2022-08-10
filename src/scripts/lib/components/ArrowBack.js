import Elements from "../Elements"

const ArrowBack = () => {
    const arrowBackImg = Elements.createImage({htmlClass1:'arrow-back', src:require('../../../images/arrow_back.svg')})
    const arrowBackBtn = Elements.createButton({id:'arrowBackBtn', child: arrowBackImg, textContent:''})
    return arrowBackBtn
}


export default ArrowBack