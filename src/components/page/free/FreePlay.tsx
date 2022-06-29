import { FC } from "react";
import { useTimer } from "react-timer-hook";

import { css, keyframes } from "@emotion/react";

import { ButtonGroup, Typography } from "@material-ui/core";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import CircleButton from "../../ui/button/CircleButton";
import CountButtonGroup from "../../ui/button/CountButtonGroup";
import CountDown from "../../ui/count/CountDown";

type Props = {
    endButtonClick: () => void;
};

const FreePlay: FC<Props> = ({ endButtonClick }) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60 * 5);
    const { seconds, minutes, pause, resume, restart } = useTimer({
        expiryTimestamp: time,
    });

    const buttons = [
        { label: "再開する", onClick: resume, icon: <PlayCircleFilledIcon /> },
        { label: "一時停止", onClick: pause, icon: <StopIcon /> },
        {
            label: "リスタート",
            onClick: () => restart(time),
            icon: <RestartAltIcon />,
        },
    ];

    return (
        <div css={styles.content}>
            <Typography css={styles.title} variant="h5">
                質問
            </Typography>

            <textarea css={styles.textarea} />

            <CountDown minutes={minutes} seconds={seconds} />

            <CountButtonGroup buttons={buttons} />

            <ButtonGroup css={styles.buttonGroup}>
                <CircleButton
                    label="終了する"
                    emotion={styles.circleButton}
                    onClick={endButtonClick}
                />
                <CircleButton
                    label="終了する"
                    emotion={styles.circleButton}
                    onClick={endButtonClick}
                />
            </ButtonGroup>
        </div>
    );
};

const keyframe = {
    content: keyframes`
        0%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    `,
};

const styles = {
    content: css`
        animation-name: ${keyframe.content};
        animation-duration: 0.5s;
        animation-timing-function: ease;
    `,
    title: css`
        height: 5vh;
        margin: 5px 0 5px 30px;
        font-family: "Kosugi Maru", sans-serif;
    `,
    textarea: css`
        font-size: 40px;
        outline: none;
        height: 20vh;
        width: 100vw;
        padding: 0 10px;
    `,
    circleButton: css`
        height: 80px;
        width: 130px;
    `,
    buttonGroup: css`
        display: flex;
        justify-content: space-around;
    `,
};

export default FreePlay;
