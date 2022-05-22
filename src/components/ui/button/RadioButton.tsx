import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import {
    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
    Typography,
} from "@material-ui/core";

const MyStyleRadioGroup = styled(RadioGroup)({
    display: "flex",
    justifyContent: "center",
    height: "10vh",
});

const RadioButton: FC<{
    questionTitle: string;
    defaultValue: string | number;
    select: { question: string; value: string | number }[];
    register: UseFormRegisterReturn;
}> = ({ questionTitle, defaultValue, select, register }) => {
    return (
        <div style={{ margin: "10px 0" }}>
            <Typography variant="h5">{questionTitle}</Typography>
            <MyStyleRadioGroup row defaultValue={defaultValue.toString()}>
                {select.map((question) => (
                    <FormControlLabel
                        key={question.question}
                        style={{ margin: "0 10px" }}
                        value={question.value.toString()}
                        control={<Radio {...register} />}
                        label={question.question}
                    />
                ))}
            </MyStyleRadioGroup>
        </div>
    );
};

export default RadioButton;
