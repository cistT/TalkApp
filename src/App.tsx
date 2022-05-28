import { FC, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

import Header from "./components/ui/header/Header";
import MainScreen from "./components/page/index/MainScreen";
import QuestionSettingType from "./components/types/QuestionSettingType";
import shuffleArray from "./components/functions/ShuffleArray";
import QuestionStore from "./components/types/QuestionStoreType";
import QuestionFolders from "./components/page/list/QuestionFolders";
import FreePlay from "./components/page/free/FreePlay";
import FinishScreen from "./components/page/finish/FinishScreen";
import QuestionScreen from "./components/page/question/QuestionScreen";
import StartScreen from "./components/page/start/StartScreen";
import { useAuthState } from "react-firebase-hooks/auth";

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

    const setStartQuestion = (questions: string[]) => {
        if (questions.length === 0) return [];

        let array: string[] = [...questions];

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

    const createFolder = (newDataId: string, newData: string) => {
        setQuestionsStore((folder) => [
            ...folder,
            { id: newDataId, name: newData, questions: [] },
        ]);

        user?.uid &&
            db
                .collection("folder")
                .doc(newDataId)
                .set({
                    name: newData,
                    folderId: newDataId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user?.uid ?? null,
                });
    };

    const deleteFolder = (folderId: string) => {
        setQuestionsStore((folder) =>
            folder.filter((data) => data.id !== folderId)
        );

        db.collection("folder").doc(folderId).delete();
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
                db.collection("question").doc(newDataId).set({
                    name: newData,
                    questionId: newDataId,
                    folderId: dataId,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user?.uid,
                });
            return;
        };
    };

    const deleteQuestion = (folderId: string) => {
        return (questionId: string) => {
            setQuestionsStore((q) => {
                return q.map((question) => {
                    if (question.id === folderId) {
                        return {
                            ...question,
                            questions: question.questions.filter(
                                (data) => data.id !== questionId
                            ),
                        };
                    }
                    return question;
                });
            });
            user?.uid && db.collection("question").doc(questionId).delete();
        };
    };

    useEffect(() => {
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
        <>
            <Header />
            <Routes>
                <Route index element={<MainScreen />} />
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
                            question={setStartQuestion(
                                questionsStore
                                    .filter(
                                        (newData) =>
                                            newData.id ===
                                            questionSetting.target
                                    )[0]
                                    ?.questions.map((data) => data.question) ??
                                    []
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
        </>
    );
};

export default App;
