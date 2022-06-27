import shuffleArray from "./ShuffleArray";

const StartQuestion = <T extends { order: number; number: number }>(
    questions: string[],
    setting: T
): string[] => {
    if (questions.length === 0) return [];

    let array: string[] = [...questions];

    if (setting.order.toString() === "1") {
        array = shuffleArray(questions);
    }
    if (setting.number < array.length) {
        array = array.filter((_, i) => i < setting.number);
    }

    return array;
};

export default StartQuestion;
