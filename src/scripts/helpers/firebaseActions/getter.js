const getter = async ({
    collection,
    docId
}) => {
    const db = firebase.firestore()
    const doc = await db.collection(collection).doc(docId).get()
    const docData = doc.data()
    return docData
}

export default getter
