import { FC, useReducer, useState } from "react";

import List from "@mui/material/List";

import QuestionNameListItem from "./item/QuestionNameListItem";
import QuestionListItem from "./item/QuestionListItem";
import BackButton from "../../ui/button/BackButton";
import QuestionStore from "../../types/QuestionStoreType";
import Question from "../../types/Question";
import SaveDialog from "../../ui/dialog/SaveDialog";

const QuestionListName: FC<{
    questionsStore: QuestionStore;
    openMainScreen: () => void;
    createFolder: (newdata: string) => void;
    addQuestion: (dataId: string) => (newData: string) => void;
}> = ({ questionsStore, openMainScreen, createFolder, addQuestion }) => {
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
                            <QuestionNameListItem
                                data={data}
                                onClick={() => onClick(data.id)}
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
                                    question={question}
                                    key={question}
                                />
                            ))}
                    </List>

                    <SaveDialog
                        title="質問を追加する"
                        inputLabel="追加する質問を入力してください"
                        save={addQuestion(questionsId)}
                    />
                    <BackButton onClick={dispatch} />
                </>
            )}
        </>
    );
};

export default QuestionListName;
