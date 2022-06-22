import { FC } from "react";
import { css, keyframes } from "@emotion/react";

import { ButtonGroup, Typography } from "@material-ui/core";

import CircleButton from "../../ui/button/CircleButton";

type Props = {
    oneMoreButtonClick: () => void;
    finishButtonClick: () => void;
};

const FinishScreen: FC<Props> = ({ oneMoreButtonClick, finishButtonClick }) => {
    return (
        <>
            <Typography css={styles.title} variant="h3" component="h4">
                お疲れさまでした
            </Typography>
            <Typography css={styles.explanation} variant="h5" component="h5">
                次に何をしますか？
            </Typography>

            <ButtonGroup css={styles.buttonGroup}>
                <CircleButton
                    label="メイン画面へ"
                    emotion={styles.circleButton}
                    onClick={finishButtonClick}
                />

                <CircleButton
                    label="もう一度"
                    emotion={styles.circleButton}
                    onClick={oneMoreButtonClick}
                />
            </ButtonGroup>
        </>
    );
};

const titleKeyframes = keyframes`
    0% {
        transform: rotate(20deg);
    }
    25% {
        transform: rotate(-20deg);
    }
    50% {
        transform: rotate(20deg);
    }
    75% {
        transform: rotate(-20deg);
    }


`;

const styles = {
    title: css`
        height: 20vh;
        width: 90vw;
        text-align: center;
        margin: 30px auto;
        font-size: 10vw;
        font-family: "Kosugi Maru", sans-serif;
        animation-name: ${titleKeyframes};
        animation-duration: 1s;
        animation-timing-function: ease;
    `,
    explanation: css`
        height: 10vh;
        width: 90%;
        text-align: center;
        margin: 10px auto;
        font-family: "Kosugi Maru", sans-serif;
    `,
    buttonGroup: css`
        display: flex;
        justify-content: space-around;
    `,
    circleButton: css`
        height: 130px;
        width: 130px;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.05);
            transform: scale(1.2);
        }
    `,
};

export default FinishScreen;
