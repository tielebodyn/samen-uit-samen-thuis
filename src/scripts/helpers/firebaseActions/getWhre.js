const getWhere = async ({
    collection,
    doc,
    docData
}) => {
    const db = firebase.firestore()
    const docs = await db.collection(collection).where(doc, "==", docData).get()
    let result = []
    docs.forEach((item) => {
        const data = {
            'id': item.id,
            'data': item.data()
        }
        result.push(data)
    })
    return result
}
export default getWhere