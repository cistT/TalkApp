import { FC, useReducer } from "react";

import { useTimer } from "react-timer-hook";

import { css } from "@emotion/react";

import { ButtonGroup, Typography } from "@material-ui/core";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import CircleButton from "../../ui/button/CircleButton";
import CountButtonGroup from "../../ui/button/CountButtonGroup";
import CountDown from "../../ui/count/CountDown";

type Props = {
    question: string[];
    timeLime?: number;
    endButtonClick: () => void;
    finishButttonClick: () => void;
};

const QuestionScreen: FC<Props> = ({
    question,
    timeLime = 5,
    endButtonClick,
    finishButttonClick,
}) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60 * timeLime);
    const { seconds, minutes, pause, resume, restart } = useTimer({
        expiryTimestamp: time,
    });

    const [nowQuestion, changeNowQuestion] = useReducer(
        (nowQuestion) => nowQuestion + 1,
        0
    );

    const buttons = [
        { label: "再開する", onClick: resume, icon: <PlayCircleFilledIcon /> },
        { label: "一時停止", onClick: pause, icon: <StopIcon /> },
        {
            label: "リスタート",
            onClick: () => restart(time),
            icon: <RestartAltIcon />,
        },
    ];

    const nextQuestion = () => {
        restart(time);
        changeNowQuestion();
    };

    return (
        <>
            <Typography css={styles.title} variant="h5">
                質問
            </Typography>

            <Typography css={styles.question} variant="h4">
                {question[nowQuestion]}
            </Typography>

            <CountDown minutes={minutes} seconds={seconds} />

            <CountButtonGroup buttons={buttons} />

            <ButtonGroup css={styles.buttonGroup}>
                <CircleButton
                    label="終了する"
                    onClick={endButtonClick}
                    emotion={styles.circleButton}
                />
                {nowQuestion + 1 === question.length ? (
                    <CircleButton
                        label="終了"
                        onClick={finishButttonClick}
                        emotion={styles.circleButton}
                    />
                ) : (
                    <CircleButton
                        label="次の質問へ"
                        onClick={nextQuestion}
                        emotion={styles.circleButton}
                    />
                )}
            </ButtonGroup>
        </>
    );
};

const styles = {
    title: css`
        height: 5vh;
        margin: 5px 0 5px 30px;
        font-family: "Kosugi Maru", sans-serif;
    `,
    question: css`
        height: 10vh;
        width: 100vw;
        text-align: center;
        margin-bottom: 30px;
        font-family: "Kosugi Maru", sans-serif;
    `,
    circleButton: css`
        height: 80px;
        width: 130px;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.05);
            transform: scale(1.2);
        }
    `,
    buttonGroup: css`
        display: flex;
        justify-content: space-around;
    `,
};

export default QuestionScreen;
