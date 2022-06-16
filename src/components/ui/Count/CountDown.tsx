import { FC } from "react";

import { css } from "@emotion/react";

import { Typography } from "@material-ui/core";
type Props = {
    minutes: number;
    seconds: number;
};

const CountDown: FC<Props> = ({ minutes, seconds }) => {
    return (
        <Typography css={styles.count} variant="h1">
            <span>{minutes}</span>:
            <span>
                {seconds.toString().length === 1
                    ? `0${seconds.toString()}`
                    : seconds}
            </span>
        </Typography>
    );
};
const styles = {
    count: css`
        height: 20vh;
        text-align: center;
        margin-bottom: 10px;
    `,
};

export default CountDown;
