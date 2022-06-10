import { FC, useReducer } from "react";
import { useTimer } from "react-timer-hook";
import { css } from "@emotion/react";

import { ButtonGroup, Typography } from "@material-ui/core";

import CircleButton from "../../ui/button/CircleButton";
import CountButtonGroup from "../../ui/button/CountButtonGroup";

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

    return (
        <>
            <Typography css={styles.title} variant="h5">
                質問
            </Typography>
            <Typography css={styles.question} variant="h4">
                {question[nowQuestion]}
            </Typography>

            {/* ToDo カウントダウンの部分は別のコンポーネントに分ける */}
            <Typography css={styles.count} variant="h1">
                <span>{minutes}</span>:
                <span>
                    {seconds.toString().length === 1
                        ? `0${seconds.toString()}`
                        : seconds}
                </span>
            </Typography>

            <CountButtonGroup
                buttons={[
                    { label: "再開する", onClick: resume },
                    { label: "一時停止", onClick: pause },
                    { label: "リスタート", onClick: () => restart(time) },
                ]}
            />

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
                        onClick={() => {
                            restart(time);
                            changeNowQuestion();
                        }}
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
    count: css`
        height: 20vh;
        text-align: center;
        margin-bottom: 10px;
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

export default QuestionScreen;
