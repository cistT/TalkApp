import QuestionStore from "./QuestionStoreType";

type QuestionListNameType = {
    questionsStore: QuestionStore;
    openMainScreen: () => void;
    createFolder: (newDataId: string, newdata: string) => void;
    deleteFolder: (folderId: string) => void;
    addQuestion: (
        dataId: string
    ) => (newDataId: string, newData: string) => void;
    deleteQuestion: (folderId: string) => (questionId: string) => void;
};

export default QuestionListNameType;
