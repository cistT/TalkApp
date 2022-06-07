import { CSSProperties, FC } from "react";

import { ButtonGroup, styled, Typography } from "@material-ui/core";

import CircleButton from "../../ui/button/CircleButton";

const MystyleButtonGroup = styled(ButtonGroup)({
    display: "flex",
    justifyContent: "space-around",
});

const circleButtonStyle: CSSProperties = {
    height: "130px",
    width: "130px",
};

type Props = {
    oneMoreButtonClick: () => void;
    finishButtonClick: () => void;
};

const FinishScreen: FC<Props> = ({ oneMoreButtonClick, finishButtonClick }) => {
    return (
        <>
            <Typography
                variant="h3"
                component="h4"
                style={{
                    height: "20vh",
                    width: "90vw",
                    textAlign: "center",
                    margin: "30px auto",
                    fontSize: "10vw",
                }}
            >
                お疲れさまでした
            </Typography>
            <Typography
                variant="h5"
                component="h5"
                style={{
                    height: "10vh",
                    width: "90%",
                    textAlign: "center",
                    margin: "10px auto",
                }}
            >
                次に何をしますか？
            </Typography>

            <MystyleButtonGroup>
                <CircleButton
                    label="メイン画面へ"
                    onClick={finishButtonClick}
                    style={circleButtonStyle}
                />

                <CircleButton
                    label="もう一度"
                    onClick={oneMoreButtonClick}
                    style={circleButtonStyle}
                />
            </MystyleButtonGroup>
        </>
    );
};

export default FinishScreen;
