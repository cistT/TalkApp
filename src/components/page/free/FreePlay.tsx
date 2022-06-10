import { FC } from "react";
import { useTimer } from "react-timer-hook";
import { css } from "@emotion/react";

import { ButtonGroup, Typography } from "@material-ui/core";

import CircleButton from "../../ui/button/CircleButton";
import CountButtonGroup from "../../ui/button/CountButtonGroup";

type Props = {
    endButtonClick: () => void;
};

const FreePlay: FC<Props> = ({ endButtonClick }) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60 * 5);
    const { seconds, minutes, pause, resume, restart } = useTimer({
        expiryTimestamp: time,
    });
    return (
        <>
            <Typography css={styles.title} variant="h5">
                質問
            </Typography>

            <textarea css={styles.textarea} />

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
                    emotion={styles.circleButton}
                    onClick={endButtonClick}
                />
                <CircleButton
                    label="終了する"
                    emotion={styles.circleButton}
                    onClick={endButtonClick}
                />
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
    textarea: css`
        font-size: 40px;
        outline: none;
        height: 20vh;
        width: 100vw;
        padding: 0 10px;
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

export default FreePlay;
