import { FC } from "react";

import { css } from "@emotion/react";

import { InputLabel, NativeSelect } from "@material-ui/core";

import SelectFormType from "../../types/SelectFormType";

const SelectForm: FC<SelectFormType> = ({
    label = "質問",
    defaultValue = undefined,
    questions,
    register,
}) => {
    return (
        <>
            <InputLabel css={styles.label} variant="standard">
                {label}
            </InputLabel>
            <NativeSelect
                css={styles.select}
                defaultValue={defaultValue}
                {...register}
            >
                {questions.map((question) => (
                    <option key={question.question} value={question.value}>
                        {question.question}
                    </option>
                ))}
            </NativeSelect>
        </>
    );
};

const styles = {
    label: css`
        height: 30px;
        margin-top: 10px;
        font-size: 20px;
        color: black;
        font-family: "Kosugi Maru", sans-serif;
    `,
    select: css`
        height: 50px;
        width: 90vw;
        margin-bottom: 10px;
    `,
};

export default SelectForm;
