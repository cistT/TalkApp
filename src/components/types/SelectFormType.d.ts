import { UseFormRegisterReturn } from "react-hook-form";

type SelectFormType = {
    label?: string;
    defaultValue?: string | undefined;
    questions: { question: string; value: string | number }[];
    register: UseFormRegisterReturn;
};

export default SelectFormType;
