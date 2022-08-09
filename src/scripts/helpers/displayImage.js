import showError from "./showError.js";

let files = [];
let uploadedImageFile;
/**
 * display profile image
 */
const displayImage = (imgElementId, buttonId) => {
    
    document.getElementById(buttonId).addEventListener('click', () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.jpg,.jpeg,.png';
        input.onchange = (e) => {
            files = e.target.files
            uploadedImageFile = files[0];
            if (files[0].size > 200000) {
                showError({
                    message: `maximum file size is 200 KB`
                })
                return null
            }
            let reader = new FileReader();
            reader.onload = (e) => {
                const imgFrame = document.getElementById(imgElementId)
                imgFrame.src = e.target.result
            }
            reader.readAsDataURL(files[0])
        }
        input.click()
    })
}

export {displayImage, uploadedImageFile}