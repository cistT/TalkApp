import { FC, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import StartScreen from "./start/StartScreen";
import QuestionScreen from "./question/QuestionScreen";
import FinishScreen from "./finish/FinishScreen";
import FreePlay from "./free/FreePlay";
import QuestionListName from "./list/QuestionListName";
import { Typography } from "@material-ui/core";

import QuestionSettingType from "../types/QuestionSettingType";
import QuestionStore from "../types/QuestionStoreType";

import shuffleArray from "../functions/ShuffleArray";
import BasicCard from "../ui/card/BasicCard";

const MainScreen: FC = () => {
    const [questionSetting, setQuestionSetting] = useState<QuestionSettingType>(
        {
            target: "1",
            order: 0,
            timeLimit: 5,
            number: 10,
        }
    );
    const saveQuestionSetting = (newData: QuestionSettingType) => {
        setQuestionSetting({ ...newData });
    };

    const defaultQuestions = [
        "一番好きな動物は何ですか？",
        "一番好きな食べ物は何ですか？",
        "一番嫌いな食べ物は何ですか?",
        "犬派？猫派?",
        "朝型？夜型？",
        "スマホの機種はAndroid？ios？",
    ];

    const groupWorkQuestions = [
        "一番好きな動物は何ですか",
        "一番好きな食べ物・料理は何ですか",
        "あなたの得意なことは何ですか",
        "あなたの苦手なことは何ですか",
        "活動後、何ができるようになりたい",
        "活動で大切にしたいことは何ですか",
        "活動で担当できそうなことは何ですか",
    ];

    const [questionsStore, setQuestionsStore] = useState<QuestionStore>([
        { id: "1", name: "default", questions: defaultQuestions },
        { id: "2", name: "グループワーク", questions: groupWorkQuestions },
    ]);

    const setRandom = (questions: string[]) => {
        let array: string[] = questions;

        if (questionSetting.order.toString() === "1") {
            array = shuffleArray(questions);
        }
        if (Number(questionSetting.number) < array.length) {
            array = array.filter((_, i) => i < Number(questionSetting.number));
        }

        return array;
    };
    const navigate = useNavigate();
    const openMainScreen = () => navigate("/");
    const openStartScreen = () => navigate("/start");
    const openQuestionScreen = () => navigate("/question");
    const openFinishScreen = () => navigate("/finish");
    const openFreePlay = () => navigate("/free");
    const openQuestionList = () => navigate("/list");

    const createFolder = (newData: string) => {
        setQuestionsStore((q) => [
            ...q,
            { id: uuidv4(), name: newData, questions: [] },
        ]);
    };

    const addQuestion = (dataId: string) => {
        return (newData: string) => {
            setQuestionsStore((questionsStore) =>
                questionsStore.map((question) => {
                    if (question.id === dataId) {
                        return {
                            ...question,
                            questions: [...question.questions, newData],
                        };
                    }
                    return question;
                })
            );
            return;
        };
    };

    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <Typography
                                variant="h2"
                                style={{ textAlign: "center" }}
                            >
                                Talk-App
                            </Typography>
                            <Typography
                                variant="h5"
                                style={{
                                    textAlign: "center",
                                    marginTop: "5px",
                                }}
                            >
                                グループワークで使えるアプリ
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <BasicCard
                                    title="開始する"
                                    explanation="質問の設定画面が出ます"
                                    buttonLabel="スタート"
                                    onClick={openStartScreen}
                                />
                                <BasicCard
                                    title="Free Play"
                                    explanation="自由に質問を作ることができます"
                                    buttonLabel="Let's Go"
                                    onClick={openFreePlay}
                                />
                                <BasicCard
                                    title="質問リスト"
                                    explanation="質問一覧を見ることができます"
                                    buttonLabel="一覧へ"
                                    onClick={openQuestionList}
                                />
                            </div>
                        </>
                    }
                />
                <Route
                    path="/start"
                    element={
                        <StartScreen
                            startButtonClick={openQuestionScreen}
                            backButtonOnClick={openMainScreen}
                            saveQuestionSetting={saveQuestionSetting}
                            questionsStore={questionsStore}
                        />
                    }
                />
                <Route
                    path="/question"
                    element={
                        <QuestionScreen
                            question={setRandom(
                                questionsStore.filter(
                                    (newData) =>
                                        newData.id === questionSetting.target
                                )[0].questions
                            )}
                            timeLime={questionSetting.timeLimit}
                            endButtonClick={openMainScreen}
                            finishButttonClick={openFinishScreen}
                        />
                    }
                />
                <Route
                    path="/finish"
                    element={
                        <FinishScreen
                            finishButtonClick={openMainScreen}
                            oneMoreButtonClick={openStartScreen}
                        />
                    }
                />

                <Route
                    path="/free"
                    element={<FreePlay endButtonClick={openMainScreen} />}
                />
                <Route
                    path="/list"
                    element={
                        <QuestionListName
                            questionsStore={questionsStore}
                            openMainScreen={openMainScreen}
                            createFolder={createFolder}
                            addQuestion={addQuestion}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default MainScreen;
