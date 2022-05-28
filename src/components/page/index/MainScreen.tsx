import { FC } from "react";

import { Typography } from "@material-ui/core";

import BasicCard from "../../ui/card/BasicCard";
import { useNavigate } from "react-router-dom";

const MainScreen: FC = () => {
    const navigate = useNavigate();

    const openStartScreen = () => navigate("/start");
    const openFreePlay = () => navigate("/free");
    const openQuestionList = () => navigate("/list");
    return (
        <>
            <Typography variant="h2" style={{ textAlign: "center" }}>
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
    );
};

export default MainScreen;
