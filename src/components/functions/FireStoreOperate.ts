import { db } from "../../firebase";
import QuestionStore from "../types/QuestionStoreType";

const setFireStore = (collection: string, doc: string, setData: object) => {
    db.collection(collection).doc(doc).set(setData);
};

const deleteFireStore = (collection: string, doc: string) => {
    db.collection(collection).doc(doc).delete();
};

const fetchFolder = (uid: string | null | undefined) => {
    let fetchFolders: QuestionStore = [];

    db.collection("folder")
        .where("uid", "==", uid)
        .onSnapshot((snapShot) => {
            fetchFolders = [
                ...snapShot.docs.map((doc) => ({
                    id: doc.data().folderId,
                    name: doc.data().name,
                    questions: [],
                })),
            ];
            console.log(fetchFolders);
            //ここまではデータがある
        });
    console.log(fetchFolders);
    return fetchFolders;
};

export { setFireStore, deleteFireStore, fetchFolder };
