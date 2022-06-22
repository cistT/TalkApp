import { FC, useReducer, useState } from "react";

import { css } from "@emotion/react";

import List from "@mui/material/List";

import QuestionFolder from "./item/QuestionFolder";
import QuestionListItem from "./item/QuestionListItem";
import SaveDialog from "../../ui/dialog/SaveDialog";
import QuestionStore from "../../types/QuestionStoreType";
import QuadrangleButton from "../../ui/button/QuadrangleButton";

type Props = {
    questionsStore: QuestionStore;
    openMainScreen: () => void;
    createFolder: (newDataId: string, newdata: string) => void;
    deleteFolder: (folderId: string) => void;
    addQuestion: (
        dataId: string
    ) => (newDataId: string, newData: string) => void;
    deleteQuestion: (folderId: string) => (questionId: string) => void;
};

const QuestionFolders: FC<Props> = ({
    questionsStore,
    openMainScreen,
    createFolder,
    deleteFolder,
    addQuestion,
    deleteQuestion,
}) => {
    const [isQuestionsList, dispatch] = useReducer(
        (isQuestionsList) => !isQuestionsList,
        false
    );
    const [questionsId, setQuestionsId] = useState<string>("");

    const onClick = (data: string) => {
        setQuestionsId(data);
        dispatch();
    };
    return (
        <>
            {!isQuestionsList && (
                <>
                    <List>
                        {questionsStore.map((data) => (
                            <QuestionFolder
                                id={data.id}
                                name={data.name}
                                deleteButton={data.id.length > 1}
                                onClick={() => onClick(data.id)}
                                deleteFolder={deleteFolder}
                                key={data.id}
                            />
                        ))}
                    </List>
                    <QuadrangleButton
                        label="戻る"
                        variant="outlined"
                        emotion={styles.button}
                        onClick={openMainScreen}
                    />
                    <SaveDialog
                        save={createFolder}
                        title="フォルダをを作成する"
                        inputLabel="フォルダ名を入力してください"
                    />
                </>
            )}
            {isQuestionsList && (
                <>
                    <List>
                        {questionsStore
                            .filter((data) => data.id === questionsId)[0]
                            .questions.map((question) => (
                                <QuestionListItem
                                    id={question.id}
                                    question={question.question}
                                    displayDeleteQuestion={
                                        questionsId.length > 1
                                    }
                                    deleteQuestion={deleteQuestion(questionsId)}
                                    key={question.id}
                                />
                            ))}
                    </List>

                    {questionsId.length > 1 && (
                        <SaveDialog
                            title="質問を追加する"
                            inputLabel="追加する質問を入力してください"
                            save={addQuestion(questionsId)}
                        />
                    )}
                    <QuadrangleButton
                        label="戻る"
                        variant="outlined"
                        emotion={styles.button}
                        onClick={dispatch}
                    />
                </>
            )}
        </>
    );
};

export default QuestionFolders;

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
