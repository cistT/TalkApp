import { FC } from "react";

import { InputLabel, NativeSelect, styled } from "@material-ui/core";

import SelectFormType from "../../types/SelectFormType";

const MyStyleInputLabel = styled(InputLabel)({
    height: "30px",
    marginTop: "10px",
    fontSize: "20px",
    color: "black",
    fontFamily: "Roboto",
});

const MyStyleNativeSelect = styled(NativeSelect)({
    height: "50px",
    width: "90vw",
    marginBottom: "10px",
});

const SelectForm: FC<SelectFormType> = ({
    label = "質問",
    defaultValue = undefined,
    questions,
    register,
}) => {
    return (
        <>
            <MyStyleInputLabel variant="standard">{label}</MyStyleInputLabel>
            <MyStyleNativeSelect defaultValue={defaultValue} {...register}>
                {questions.map((question) => (
                    <option
                        key={question.question}
                        value={question.value}
                        style={{ textAlign: "center" }}
                    >
                        {question.question}
                    </option>
                ))}
            </MyStyleNativeSelect>
        </>
    );
};

export default SelectForm;
