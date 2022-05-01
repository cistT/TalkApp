import { FC } from "react";
import { useForm } from "react-hook-form";

import StartScreenType from "../types/StartScreenType";
import QuestionSettingType from "../types/QuestionSettingType";

import SelectForm from "./SelectForm";
import RadioButton from "../Buttons/RadioButton";
import Quadrangle from "../Buttons/QuadrangleButton";

import { Button, ButtonGroup, styled} from "@material-ui/core";


const MyStyleForm=styled("form")({
    textAlign: 'center',
    fontFamily: 'Roboto',
    justifyContent: 'center',
})

const MyStyleButtonGroup = styled(ButtonGroup)({
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
})

const StartScreen:FC<StartScreenType>=({
    startButtonClick=()=>undefined,
    backButtonOnClick=()=>undefined,
    saveQuestionSetting=()=>undefined
})=>{
    const {register, handleSubmit}=useForm<QuestionSettingType>();
    const onSubmit =(data:QuestionSettingType)=>{
        saveQuestionSetting(data)
        startButtonClick()
    }
    const selectFormQuestions:{question:string,value:string|number}[]=[
        {question:"default",value:"default"},
        {question:"test",value:"test"},
        {question:"hoge",value:"hoge"},
    ]
    const selectTest1:{question:string,value:string|number}[]=[
        {question:"1分",value:1},
        {question:"3分",value:3},
        {question:"5分",value:5},
        {question:"10分",value:10},
    ]
    const selectTest2:{question:string,value:string|number}[]=[
        {question:"1から",value:0},
        {question:"ランダム",value:1},
    ]
    const selectTest3:{question:string,value:string|number}[]=[
        {question:"1問",value:1},
        {question:"5問",value:5},
        {question:"10問",value:10},
        {question:"全問",value:100},
    ]
    return (
    <MyStyleForm onSubmit={handleSubmit(onSubmit)}>
        <SelectForm
            label="質問の対象"
            questions={selectFormQuestions}
            register={register("target")}
        />

        <RadioButton
            questionTitle="順番"
            defaultValue={0}
            select={selectTest2}
            register={register("order")}
        />
        <RadioButton
            questionTitle="制限時間"
            defaultValue={5}
            select={selectTest1}
            register={register("timeLimit")}
        />
        <RadioButton
            questionTitle="問題数"
            defaultValue={10}
            select={selectTest3}
            register={register("number")}
        />

        <MyStyleButtonGroup>
            <Quadrangle
                label="戻る"
                onClick={backButtonOnClick}
                style={{height:"60px",width:"45vw"}}
            />
            <Button
                style={{height:"60px",width:"45vw"}}
                variant="outlined"
                type="submit"
            >
                スタート
            </Button>
        </MyStyleButtonGroup>
    </MyStyleForm>
    )
}

export default StartScreen;