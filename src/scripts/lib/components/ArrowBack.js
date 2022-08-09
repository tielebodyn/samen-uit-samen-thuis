import Elements from "../Elements"

const ArrowBack = () => {
    const arrowBackImg = Elements.createImage({htmlClass1:'arrow-back', src:'/arrow_back.16db6938.svg'})
    const arrowBackBtn = Elements.createButton({id:'arrowBackBtn', child: arrowBackImg, textContent:''})
    return arrowBackBtn
}


export default ArrowBack