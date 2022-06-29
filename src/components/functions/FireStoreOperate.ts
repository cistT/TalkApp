import { db } from "../../firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

const setFireStore = async (path: string, pathDoc: string, setData: object) => {
    await setDoc(doc(db, path, pathDoc), setData);
};

const deleteFireStore = async (path: string, pathDoc: string) => {
    await deleteDoc(doc(db, path, pathDoc));
};

// const fetchFolder = (uid: string | null | undefined) => {
//     let fetchFolders: QuestionStore = [];

//     db.collection("folder")
//         .where("uid", "==", uid)
//         .onSnapshot((snapShot) => {
//             fetchFolders = [
//                 ...snapShot.docs.map((doc) => ({
//                     id: doc.data().folderId,
//                     name: doc.data().name,
//                     questions: [],
//                 })),
//             ];
//             console.log(fetchFolders);
//             //ここまではデータがある
//         });
//     console.log(fetchFolders);
//     return fetchFolders;
// };

export { setFireStore, deleteFireStore };
