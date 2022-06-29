import QuestionStore from "../types/QuestionStoreType";

const ExtractQuestion = (folders: QuestionStore, target: string) => {
    const extractFolder = folders
        .filter((newData) => newData.id === target)[0]
        .questions.map((data) => data.question);

    return extractFolder;
};

export default ExtractQuestion;
