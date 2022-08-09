const convertDate = (serverTime) => {
const time = serverTime.replace('GMT+0200 (Midden-Europese zomertijd)', '')
return time
}

export default convertDate