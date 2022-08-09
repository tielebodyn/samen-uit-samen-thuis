const showError = ({message}) => {
    const inputValidation = document.getElementById('input-validation');
    inputValidation.classList.remove('hide');
    inputValidation.innerHTML = message
    }

export default showError