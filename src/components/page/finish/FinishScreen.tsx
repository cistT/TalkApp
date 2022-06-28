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

const keyframe = {
    title: keyframes`
        0%{
            transform:scale(0.5);
        }
    `,
    otherTitle: keyframes`
        0%{
            opacity:0;
            transform:scale(0);
        }
        100%{
            opacity:1;
            transform:scale(1);
        }
    `,
};

const styles = {
    title: css`
        height: 20vh;
        width: 90vw;
        max-width: 800px;
        text-align: center;
        margin: 30px auto;
        font-size: clamp(16px, 8vw, 5rem);
        font-family: "Kosugi Maru", sans-serif;
        animation-name: ${keyframe.title};
        animation-duration: 1.5s;
        animation-timing-function: ease;
    `,
    explanation: css`
        height: 10vh;
        width: 90vw;
        max-width: 500px;
        font-size: clamp(16px, 6vw, 2rem);
        text-align: center;
        margin: 10px auto;
        font-family: "Kosugi Maru", sans-serif;
        animation-name: ${keyframe.otherTitle};
        animation-duration: 3s;
        animation-timing-function: ease;
    `,
    buttonGroup: css`
        display: flex;
        justify-content: space-around;
        animation-name: ${keyframe.otherTitle};
        animation-duration: 2s;
        animation-timing-function: ease;
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
