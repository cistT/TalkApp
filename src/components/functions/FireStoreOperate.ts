import { db } from "../../firebase";

const setFireStore = (collection: string, doc: string, setData: object) => {
    db.collection(collection).doc(doc).set(setData);
};

const deleteFireStore = (collection: string, doc: string) => {
    db.collection(collection).doc(doc).delete();
};

const fetchFirestore = (collection: string, where: string) => {};

export { setFireStore, deleteFireStore };
