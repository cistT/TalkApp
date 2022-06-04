import { UseFormRegisterReturn } from "react-hook-form";

type RadioButtonType = {
    questionTitle: string;
    defaultValue: string | number;
    select: { question: string; value: string | number }[];
    register: UseFormRegisterReturn;
};

export default RadioButtonType;
