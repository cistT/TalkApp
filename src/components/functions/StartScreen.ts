import QuestionStore from "../types/QuestionStoreType";

type QuestionSetting = { question: string; value: string | number }[];

export const selectQuestionNames = (
    questionStore: QuestionStore
): QuestionSetting => {
    return questionStore
        .filter((data) => data.questions.length > 0)
        .map((data) => ({
            question: data.name,
            value: data.id,
        }));
};
