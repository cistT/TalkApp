import { FC } from "react";

import { css } from "@emotion/react";

import { Button } from "@material-ui/core";
import ButtonType from "../../types/ButtonType";

const CircleButton: FC<ButtonType> = ({
    label = "",
    style,
    emotion,
    variant = "outlined",
    onClick = () => undefined,
}) => {
    return (
        <Button
            css={[styles.button, emotion]}
            style={style}
            variant={variant}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

const styles = {
    button: css`
        width: 100px;
        height: 100px;
        border-radius: 50%;
    `,
};

export default CircleButton;

//Button Demo
//https://v4.mui.com/components/tooltips/#disabled-elements
