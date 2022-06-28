import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import { auth, db } from "./firebase";

import { css } from "@emotion/react";

import Header from "./components/ui/header/Header";
import MainScreen from "./components/page/index/MainScreen";
import StartScreen from "./components/page/start/StartScreen";
import QuestionScreen from "./components/page/question/QuestionScreen";
import FinishScreen from "./components/page/finish/FinishScreen";
import FreePlay from "./components/page/free/FreePlay";
import QuestionFolders from "./components/page/list/QuestionFolders";

import QuestionSettingType from "./components/types/QuestionSettingType";
import QuestionStore from "./components/types/QuestionStoreType";

import {
    deleteFireStore,
    setFireStore,
} from "./components/functions/FireStoreOperate";
import StartQuestion from "./components/functions/StartQuestion";
import DeleteQuestion from "./components/functions/DeleteQuestion";

const App: FC = () => {
    const [user] = useAuthState(auth);

    const [questionSetting, setQuestionSetting] = useState<QuestionSettingType>(
        {
            target: "1",
            order: 0,
            timeLimit: 5,
            number: 10,
        }
    );
    const saveQuestionSetting = (setting: QuestionSettingType) => {
        setQuestionSetting({ ...setting });
    };

    const defaultQuestions = [
        { id: "0", question: "一番好きな動物は何ですか？" },
        { id: "1", question: "一番好きな食べ物は何ですか？" },
        { id: "2", question: "一番嫌いな食べ物は何ですか?" },
        { id: "3", question: "犬派？猫派?" },
        { id: "4", question: "朝型？夜型？" },
        { id: "5", question: "スマホの機種はAndroid？ios？" },
    ];

    const groupWorkQuestions = [
        { id: "0", question: "一番好きな動物は何ですか" },
        { id: "1", question: "一番好きな食べ物・料理は何ですか" },
        { id: "2", question: "あなたの得意なことは何ですか" },
        { id: "3", question: "あなたの苦手なことは何ですか" },
        { id: "4", question: "活動後、何ができるようになりたい" },
        { id: "5", question: "活動で大切にしたいことは何ですか" },
        { id: "6", question: "活動で担当できそうなことは何ですか" },
    ];

    const [questionsStore, setQuestionsStore] = useState<QuestionStore>([
        { id: "1", name: "デフォルト", questions: defaultQuestions },
        { id: "2", name: "グループワーク", questions: groupWorkQuestions },
    ]);

    const navigate = useNavigate();
    const openMainScreen = () => navigate("/");
    const openStartScreen = () => navigate("/start");
    const openQuestionScreen = () => navigate("/question");
    const openFinishScreen = () => navigate("/finish");
    const openFreePlay = () => navigate("/free");
    const openQuestionList = () => navigate("/list");

    const createFolder = (newDataId: string, newData: string) => {
        setQuestionsStore((folder) => [
            ...folder,
            { id: newDataId, name: newData, questions: [] },
        ]);

        user?.uid &&
            setFireStore("folder", newDataId, {
                name: newData,
                folderId: newDataId,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: user.uid,
            });
    };

    const deleteFolder = (folderId: string) => {
        setQuestionsStore((folder) =>
            folder.filter((data) => data.id !== folderId)
        );
        user?.uid && deleteFireStore("folder", folderId);
    };

    const addQuestion = (dataId: string) => {
        return (newDataId: string, newData: string) => {
            setQuestionsStore((questionsStore) =>
                questionsStore.map((question) => {
                    if (question.id === dataId) {
                        return {
                            ...question,
                            questions: [
                                ...question.questions,
                                { id: newDataId, question: newData },
                            ],
                        };
                    }
                    return question;
                })
            );

            user?.uid &&
                setFireStore("question", newDataId, {
                    name: newData,
                    questionId: newDataId,
                    folderId: dataId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user.uid,
                });

            return;
        };
    };

    const deleteQuestion = (folderId: string) => {
        return (questionId: string) => {
            setQuestionsStore((q) => {
                return q.map((question) =>
                    question.id === folderId
                        ? DeleteQuestion(questionId, question)
                        : question
                );
            });
            user?.uid && deleteFireStore("question", questionId);
        };
    };

    useLayoutEffect(() => {
        user?.uid &&
            db
                .collection("folder")
                .where("uid", "==", user?.uid ?? null)
                .onSnapshot((snapShot) => {
                    setQuestionsStore([
                        {
                            id: "1",
                            name: "デフォルト",
                            questions: defaultQuestions,
                        },
                        {
                            id: "2",
                            name: "グループワーク",
                            questions: groupWorkQuestions,
                        },
                        ...snapShot.docs.map((doc) => ({
                            id: doc.data().folderId,
                            name: doc.data().name,
                            questions: [],
                        })),
                    ]);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        user?.uid &&
            db
                .collection("question")
                .where("uid", "==", user?.uid ?? null)
                .onSnapshot((snapShot) => {
                    const data = snapShot.docs.map((doc) => doc.data());
                    setQuestionsStore((q) =>
                        q.map((folder) => ({
                            id: folder.id,
                            name: folder.name,
                            questions:
                                folder.questions.length > 0
                                    ? folder.questions
                                    : data
                                          .filter(
                                              (question) =>
                                                  question.folderId ===
                                                  folder.id
                                          )
                                          .map((question) => ({
                                              question: question.name,
                                              id: question.questionId,
                                          })),
                        }))
                    );
                });
    }, [user?.uid]);

    return (
        <div css={styles.app}>
            <Header title="Talk-App (α版)" />

            <Routes>
                <Route
                    index
                    element={
                        <MainScreen
                            cards={[
                                {
                                    title: "開始する",
                                    explanation: "質問の設定画面が出ます",
                                    buttonLabel: "スタート",
                                    onClick: openStartScreen,
                                },
                                {
                                    title: "Free Play",
                                    explanation:
                                        "自由に質問を作ることができます",
                                    buttonLabel: "Let's Go",
                                    onClick: openFreePlay,
                                },
                                {
                                    title: "質問リスト",
                                    explanation: "質問一覧を見ることができます",
                                    buttonLabel: "質問リストへ",
                                    onClick: openQuestionList,
                                },
                            ]}
                        />
                    }
                />
                <Route
                    path="/start"
                    element={
                        <StartScreen
                            startButtonClick={openQuestionScreen}
                            backButtonClick={openMainScreen}
                            saveQuestionSetting={saveQuestionSetting}
                            questionsStore={questionsStore}
                        />
                    }
                />
                <Route
                    path="/question"
                    element={
                        <QuestionScreen
                            question={StartQuestion(
                                questionsStore
                                    .filter(
                                        (newData) =>
                                            newData.id ===
                                            questionSetting.target
                                    )[0]
                                    ?.questions.map((data) => data.question) ??
                                    [],
                                questionSetting
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
                        <QuestionFolders
                            questionsStore={questionsStore}
                            openMainScreen={openMainScreen}
                            createFolder={createFolder}
                            deleteFolder={deleteFolder}
                            addQuestion={addQuestion}
                            deleteQuestion={deleteQuestion}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default App;

const styles = {
    app: css``,
};
