import { FC } from "react";

import { Typography } from "@material-ui/core";

import BasicCard from "../../ui/card/BasicCard";

type Props = {
    title: string;
    explanation?: string;
    buttonLabel: string;
    onClick: () => void;
}[];

const MainScreen: FC<{ cards: Props }> = ({ cards }) => {
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
                {cards.map((card, i) => (
                    <BasicCard
                        title={card.title}
                        explanation={card.explanation ?? ""}
                        buttonLabel={card.buttonLabel}
                        onClick={card.onClick}
                        key={`${card.title + i}`}
                    />
                ))}
            </div>
        </>
    );
};

export default MainScreen;
