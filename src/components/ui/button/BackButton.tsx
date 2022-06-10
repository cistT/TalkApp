import { FC } from "react";

import { css } from "@emotion/react";

import { Button } from "@material-ui/core";

const BackButton: FC<{
    onClick: () => void;
}> = ({ onClick }) => {
    return (
        <Button css={styles.button} variant="outlined" onClick={onClick}>
            戻る
        </Button>
    );
};

const styles = {
    button: css`
        height: 60px;
        width: 50vw;
        float: right;
    `,
};

export default BackButton;
