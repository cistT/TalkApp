import { FC, useReducer, useState } from "react";

import List from "@mui/material/List";

import QuestionFolder from "./item/QuestionFolder";
import QuestionListItem from "./item/QuestionListItem";
import BackButton from "../../ui/button/BackButton";
import SaveDialog from "../../ui/dialog/SaveDialog";
import QuestionListNameType from "../../types/QuestionListNameType";

const QuestionFolders: FC<QuestionListNameType> = ({
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
                    <BackButton onClick={openMainScreen} />
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
                    <BackButton onClick={dispatch} />
                </>
            )}
        </>
    );
};

export default QuestionFolders;
