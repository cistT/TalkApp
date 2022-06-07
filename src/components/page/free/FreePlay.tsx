import { CSSProperties, FC } from "react";
import { useTimer } from "react-timer-hook";

import { ButtonGroup, styled, Typography } from "@material-ui/core";

import CircleButton from "../../ui/button/CircleButton";
import CountButtonGroup from "../../ui/button/CountButtonGroup";

const MyStyleTypoGraphyTitle = styled(Typography)({
    height: "5vh",
    margin: "5px 0 5px 30px",
});

const MyStyleTypographyCountDown = styled(Typography)({
    height: "20vh",
    textAlign: "center",
    marginBottom: "10px",
});

const CircleButtonStyle: CSSProperties = {
    height: "80px",
    width: "130px",
};
const MyStyleButtonGroup = styled(ButtonGroup)({
    display: "flex",
    justifyContent: "space-around",
});

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
            <MyStyleTypoGraphyTitle variant="h5">質問</MyStyleTypoGraphyTitle>

            <textarea
                style={{
                    fontSize: "40px",
                    outline: "none",
                    height: "20vh",
                    width: "100vw",
                    padding: "0 10px",
                }}
            />

            {/* ToDo カウントダウンの部分は別のコンポーネントに分ける */}
            <MyStyleTypographyCountDown variant="h1">
                <span>{minutes}</span>:
                <span>
                    {seconds.toString().length === 1
                        ? `0${seconds.toString()}`
                        : seconds}
                </span>
            </MyStyleTypographyCountDown>

            <CountButtonGroup
                buttons={[
                    { label: "再開する", onClick: resume },
                    { label: "一時停止", onClick: pause },
                    { label: "リスタート", onClick: () => restart(time) },
                ]}
            />

            <MyStyleButtonGroup>
                <CircleButton
                    label="終了する"
                    onClick={endButtonClick}
                    style={CircleButtonStyle}
                />
                <CircleButton
                    label="終了する"
                    onClick={endButtonClick}
                    style={CircleButtonStyle}
                />
            </MyStyleButtonGroup>
        </>
    );
};

export default FreePlay;
