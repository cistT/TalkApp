import { FC } from "react";

import {
    FormControlLabel,
    Radio,
    RadioGroup,
    styled,
    Typography,
} from "@material-ui/core";
import RadioButtonType from "../../types/RadioButtonType";

const MyStyleRadioGroup = styled(RadioGroup)({
    display: "flex",
    justifyContent: "center",
    height: "10vh",
});

const RadioButton: FC<RadioButtonType> = ({
    questionTitle,
    defaultValue,
    select,
    register,
}) => {
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
