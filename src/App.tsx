import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import { auth, db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import QuestionSettingType from "./components/types/QuestionSettingType";
import QuestionStore from "./components/types/QuestionStoreType";

import Header from "./components/ui/header/Header";
import MainScreen from "./components/page/index/MainScreen";
import StartScreen from "./components/page/start/StartScreen";
import QuestionScreen from "./components/page/question/QuestionScreen";
import FinishScreen from "./components/page/finish/FinishScreen";
import FreePlay from "./components/page/free/FreePlay";
import QuestionFolders from "./components/page/list/QuestionFolders";
import QuestionItemScreen from "./components/page/item/QuestionItemScreen";

import {
    deleteFireStore,
    setFireStore,
} from "./components/functions/FireStoreOperate";
import StartQuestion from "./components/functions/StartQuestion";
import {
    AddQuestion,
    DeleteQuestion,
} from "./components/functions/QuestionOperater";
import ExtractQuestion from "./components/functions/ExtractQuestion";

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
    const openItemList = () => navigate("/item");

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

    const [listItem, setListItem] = useState<string>("1");
    const setQuestionListItem = (folderId: string) => {
        setListItem(folderId);
    };

    const addQuestion = (folderId: string) => {
        return (newQuestionId: string, newQuestion: string) => {
            setQuestionsStore((questionsStore) =>
                questionsStore.map((folder) => {
                    return folder.id === folderId
                        ? AddQuestion(folder, newQuestionId, newQuestion)
                        : folder;
                })
            );

            user?.uid &&
                setFireStore("question", newQuestionId, {
                    name: newQuestion,
                    questionId: newQuestionId,
                    folderId: folderId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user.uid,
                });

            return;
        };
    };

    const deleteQuestion = (folderId: string) => {
        return (questionId: string) => {
            setQuestionsStore((q) => {
                return q.map((folder) =>
                    folder.id === folderId
                        ? DeleteQuestion(questionId, folder)
                        : folder
                );
            });
            user?.uid && deleteFireStore("question", questionId);
        };
    };

    useLayoutEffect(() => {
        if (user?.uid) {
            (async () => {
                const q = query(
                    collection(db, "folder"),
                    where("uid", "==", user?.uid ?? null)
                );
                const querySnapshot = await getDocs(q);
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
                    ...querySnapshot.docs.map((doc) => ({
                        id: doc.data().folderId,
                        name: doc.data().name,
                        questions: [],
                    })),
                ]);
            })();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (user?.uid) {
            (async () => {
                const q = query(
                    collection(db, "question"),
                    where("uid", "==", user?.uid ?? null)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => doc.data());
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
                                              question.folderId === folder.id
                                      )
                                      .map((question) => ({
                                          question: question.name,
                                          id: question.questionId,
                                      })),
                    }))
                );
            })();
        }
    }, [user?.uid]);

    const cards = [
        {
            title: "開始する",
            explanation: "質問の設定画面が出ます",
            buttonLabel: "スタート",
            onClick: openStartScreen,
        },
        {
            title: "Free Play",
            explanation: "自由に質問を作ることができます",
            buttonLabel: "Let's Go",
            onClick: openFreePlay,
        },
        {
            title: "質問リスト",
            explanation: "質問一覧を見ることができます",
            buttonLabel: "質問リストへ",
            onClick: openQuestionList,
        },
    ];

    return (
        <>
            <Header title="Talk-App (α版)" titleOnClick={openMainScreen} />

            <Routes>
                <Route
                    path="/item"
                    element={
                        <QuestionItemScreen
                            question={
                                questionsStore.filter(
                                    (item) => item.id === listItem
                                )[0]
                            }
                            deleteQuestion={deleteQuestion}
                            addQuestion={addQuestion}
                            backButton={openQuestionList}
                        />
                    }
                />
                <Route index element={<MainScreen cards={cards} />} />
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
                                ExtractQuestion(
                                    questionsStore,
                                    questionSetting.target
                                ),
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
                            setQuestionListItem={setQuestionListItem}
                            openItemList={openItemList}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
