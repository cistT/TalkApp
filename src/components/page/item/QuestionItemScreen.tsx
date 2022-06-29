import { FC } from "react";

import { css, keyframes } from "@emotion/react";

import { List } from "@mui/material";

import Question from "../../types/Question";

import QuestionListItem from "../list/item/QuestionListItem";
import SaveDialog from "../../ui/dialog/SaveDialog";
import QuadrangleButton from "../../ui/button/QuadrangleButton";

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
        <div css={styles.content}>
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
        </div>
    );
};

export default QuestionItemScreen;

const keyframe = {
    content: keyframes`
        0%{
            opacity:0;
            transform:scale(0.9);
        }
        100%{
            opacity:1;
            transform:scale(1);
        }
    `,
};

const styles = {
    content: css`
        animation-name: ${keyframe.content};
        animation-duration: 0.75s;
        animation-timing-function: ease;
    `,
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
