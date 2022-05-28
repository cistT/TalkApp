import { FC } from "react";

import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Button } from "@material-ui/core";

const QuestionListItem: FC<{
    id: string;
    question: string;
    deleteQuestion: (questionId: string) => void;
    displayDeleteQuestion?: boolean;
}> = ({ id, question, deleteQuestion, displayDeleteQuestion = true }) => {
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
