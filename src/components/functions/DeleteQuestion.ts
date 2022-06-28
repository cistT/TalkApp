import Question from "../types/Question";

const DeleteQuestion = (questionId: string, question: Question): Question => {
    return {
        ...question,
        questions: question.questions.filter((data) => data.id !== questionId),
    };
};

export default DeleteQuestion;
