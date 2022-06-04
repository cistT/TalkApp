import { FC } from "react";

import { Button, styled } from "@material-ui/core";
import ButtonType from "../../types/ButtonType";

const MyStyleButton = styled(Button)({
    height: "60px",
    width: "60px",
});

const QuadrangleButton: FC<ButtonType> = ({
    label = "",
    onClick = () => undefined,
    variant = "outlined",
    style,
}) => {
    return (
        <MyStyleButton style={style} variant={variant} onClick={onClick}>
            {label}
        </MyStyleButton>
    );
};

export default QuadrangleButton;
