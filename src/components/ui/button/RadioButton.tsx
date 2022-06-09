import { FC } from "react";

import { css } from "@emotion/react";

import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";

import RadioButtonType from "../../types/RadioButtonType";

const RadioButton: FC<RadioButtonType> = ({
    questionTitle,
    defaultValue,
    select,
    register,
}) => {
    return (
        <div css={styles.area}>
            <Typography variant="h5">{questionTitle}</Typography>
            <RadioGroup
                css={styles.radioGroup}
                row
                defaultValue={defaultValue.toString()}
            >
                {select.map((question) => (
                    <FormControlLabel
                        key={question.question}
                        css={styles.label}
                        control={<Radio {...register} />}
                        label={question.question}
                        value={question.value.toString()}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

const styles = {
    area: css`
        margin: 10px 0;
    `,
    radioGroup: css`
        display: flex;
        justify-content: center;
        height: 10vh;
    `,
    label: css`
        margin: 0 10px;
    `,
};

export default RadioButton;
