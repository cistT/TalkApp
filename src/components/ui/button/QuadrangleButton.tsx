import { FC } from "react";

import { css } from "@emotion/react";

import { Button } from "@material-ui/core";

import ButtonType from "../../types/ButtonType";

const QuadrangleButton: FC<ButtonType> = ({
    label = "",
    onClick = () => undefined,
    variant = "outlined",
    style,
    emotion,
    buttonIcon = undefined,
}) => {
    return (
        <Button
            css={[styles.button, emotion]}
            style={style}
            variant={variant}
            onClick={onClick}
        >
            <>
                {buttonIcon}
                {label}
            </>
        </Button>
    );
};

const styles = {
    button: css`
        height: 60px;
        width: 60px;
        font-size: 20px;
    `,
};

export default QuadrangleButton;
