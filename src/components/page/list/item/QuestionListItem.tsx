import { FC } from "react";

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
            <div style={{ display: "flex", height: "60px" }}>
                <ListItem style={{ width: "100vw" }}>{question}</ListItem>
                {displayDeleteQuestion && (
                    <Button onClick={() => deleteQuestion(id)}>削除</Button>
                )}
            </div>

            <Divider />
        </>
    );
};

export default QuestionListItem;
