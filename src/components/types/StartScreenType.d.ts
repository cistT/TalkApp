import QuestionStore from "./QuestionStoreType";

type StartScreenType = {
    startButtonClick?: () => void;
    backButtonClick?: () => void;
    saveQuestionSetting?: (data: {
        target: string;
        order: number;
        timeLimit: number;
        number: number;
    }) => void;
    questionsStore: QuestionStore;
};

export default StartScreenType;
