import { FC } from "react";
import { css } from "@emotion/react";

import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";

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
                    <Button onClick={() => deleteQuestion(id)}>削除</Button>
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
    `,
};

export default QuestionListItem;
