import QuestionStore from "../types/QuestionStoreType";

type QuestionSetting = { question: string; value: string | number }[];

export const selectQuestionNames = (
    questionStore: QuestionStore
): QuestionSetting => {
    const selectedQuestion = questionStore
        .filter((folder) => folder.questions.length > 0)
        .map((question) => ({
            question: question.name,
            value: question.id,
        }));

    return selectedQuestion;
};
