import { FC } from "react";
import { useForm } from "react-hook-form";

import { Button, ButtonGroup, styled } from "@material-ui/core";

import StartScreenType from "../../types/StartScreenType";
import QuestionSettingType from "../../types/QuestionSettingType";

import SelectForm from "../../ui/form/SelectForm";
import RadioButton from "../../ui/button/RadioButton";
import Quadrangle from "../../ui/button/QuadrangleButton";

type QuestionSetting = { question: string; value: string | number }[];

const MyStyleForm = styled("form")({
    textAlign: "center",
    fontFamily: "Roboto",
    justifyContent: "center",
});

const MyStyleButtonGroup = styled(ButtonGroup)({
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
});

const StartScreen: FC<StartScreenType> = ({
    startButtonClick = () => undefined,
    backButtonClick = () => undefined,
    saveQuestionSetting = () => undefined,
    questionsStore,
}) => {
    const { register, handleSubmit } = useForm<QuestionSettingType>();
    const onSubmit = (data: QuestionSettingType) => {
        saveQuestionSetting(data);
        startButtonClick();
    };

    const selectQuestion: QuestionSetting = questionsStore
        .filter((data) => data.questions.length > 0)
        .map((data) => ({
            question: data.name,
            value: data.id,
        }));

    const selectTimeLimit: QuestionSetting = [
        { question: "1分", value: 1 },
        { question: "3分", value: 3 },
        { question: "5分", value: 5 },
        { question: "10分", value: 10 },
    ];
    const selectOrder: QuestionSetting = [
        { question: "1から", value: 0 },
        { question: "ランダム", value: 1 },
    ];
    const selectNumber: QuestionSetting = [
        { question: "1問", value: 1 },
        { question: "5問", value: 5 },
        { question: "10問", value: 10 },
        { question: "全問", value: 100 },
    ];

    return (
        <MyStyleForm onSubmit={handleSubmit(onSubmit)}>
            <SelectForm
                label="質問の対象"
                questions={selectQuestion}
                register={register("target")}
            />

            <RadioButton
                questionTitle="順番"
                defaultValue={0}
                select={selectOrder}
                register={register("order")}
            />
            <RadioButton
                questionTitle="制限時間"
                defaultValue={5}
                select={selectTimeLimit}
                register={register("timeLimit")}
            />
            <RadioButton
                questionTitle="問題数"
                defaultValue={10}
                select={selectNumber}
                register={register("number")}
            />

            <MyStyleButtonGroup>
                <Quadrangle
                    label="戻る"
                    onClick={backButtonClick}
                    style={{ height: "60px", width: "45vw" }}
                />
                <Button
                    style={{ height: "60px", width: "45vw" }}
                    variant="outlined"
                    type="submit"
                >
                    スタート
                </Button>
            </MyStyleButtonGroup>
        </MyStyleForm>
    );
};

export default StartScreen;
