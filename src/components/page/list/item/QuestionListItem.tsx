import { FC } from "react";
import { css, keyframes } from "@emotion/react";

import ListItem from "@mui/material/ListItem";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

type Props = {
    id: string;
    question: string;
    deleteQuestion: (questionId: string) => void;
    displayDeleteQuestion?: boolean;
};

const QuestionListItem: FC<Props> = ({
    id,
    question,
    deleteQuestion,
    displayDeleteQuestion = true,
}) => {
    return (
        <>
            <div css={styles.itemGroup}>
                <ListItem css={styles.item}>{question}</ListItem>
                {displayDeleteQuestion && (
                    <Button
                        css={styles.button}
                        onClick={() => deleteQuestion(id)}
                    >
                        <>
                            <DeleteIcon />
                            <div>削除</div>
                        </>
                    </Button>
                )}
            </div>

            <Divider />
        </>
    );
};

const styles = {
    itemGroup: css`
        display: flex;
        height: 60px;
    `,
    item: css`
        width: 100vw;
        font-size: 30px;
    `,
    button: css`
        display: inline;
        width: 10vw;
        margin-right: 20px;
    `,
};

export default QuestionListItem;
