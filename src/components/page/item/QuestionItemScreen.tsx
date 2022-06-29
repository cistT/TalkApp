import { List } from "@mui/material";
import React, { FC } from "react";
import { css, keyframes } from "@emotion/react";
import Question from "../../types/Question";
import QuadrangleButton from "../../ui/button/QuadrangleButton";
import SaveDialog from "../../ui/dialog/SaveDialog";
import QuestionListItem from "../list/item/QuestionListItem";

type Props = {
    question: Question;
    deleteQuestion: (folderId: string) => (questionId: string) => void;
    addQuestion: (
        dataId: string
    ) => (newDataId: string, newData: string) => void;
    backButton: () => void;
};

const QuestionItemScreen: FC<Props> = ({
    question,
    deleteQuestion,
    addQuestion,
    backButton,
}) => {
    const { id, questions } = question;
    return (
        <>
            <List>
                {questions.map((question) => (
                    <QuestionListItem
                        id={question.id}
                        question={question.question}
                        displayDeleteQuestion={true}
                        deleteQuestion={deleteQuestion(id)}
                        key={question.id}
                    />
                ))}
            </List>
            {id.length > 1 && (
                <SaveDialog
                    title="質問を追加する"
                    inputLabel="追加する質問を入力してください"
                    save={addQuestion(id)}
                />
            )}
            <QuadrangleButton
                label="戻る"
                variant="outlined"
                emotion={styles.button}
                onClick={backButton}
            />
        </>
    );
};

export default QuestionItemScreen;

const styles = {
    button: css`
        height: 60px;
        width: 50vw;
        float: right;
        transition: all 0.5s;
        :hover {
            background-color: rgba(35, 133, 252, 0.3);
        }
    `,
};
