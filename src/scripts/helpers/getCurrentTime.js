const getCurrentTime = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const today = `${yyyy}-${mm}-${dd}`
    const hour = String(date.getHours()).padStart(2, '0')
    const min = String(date.getMinutes()).padStart(2, '0')
    const dateTime = `${today} ${hour}:${min}`
    return dateTime
}

export default getCurrentTime;