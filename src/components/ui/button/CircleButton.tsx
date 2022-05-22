import { FC } from "react";

import { Button, styled } from "@material-ui/core";

const MyStyleButton = styled(Button)({
    width: "100px",
    height: "100px",
    borderRadius: "50%",
});

const CircleButton: FC<{
    label?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}> = ({ label = "", onClick = () => undefined, style }) => {
    return (
        <>
            <MyStyleButton onClick={onClick} style={style} variant="outlined">
                {label}
            </MyStyleButton>
        </>
    );
};

export default CircleButton;

//Button Demo
//https://v4.mui.com/components/tooltips/#disabled-elements
