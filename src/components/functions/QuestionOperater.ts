import Question from "../types/Question";

const AddQuestion = (
    question: Question,
    newQuestionId: string,
    newQuestion: string
) => {
    return {
        ...question,
        questions: [
            ...question.questions,
            { id: newQuestionId, question: newQuestion },
        ],
    };
};

const DeleteQuestion = (questionId: string, question: Question): Question => {
    return {
        ...question,
        questions: question.questions.filter((data) => data.id !== questionId),
    };
};

export { AddQuestion, DeleteQuestion };
