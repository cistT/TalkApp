import { FC, useState } from "react";

import MainButtonGroup from "./MainButtonGroup";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import FinishScreen from "./FinishScreen";
import randomArray from "../functions/RandomArray";
import QuestionSettingType from "../types/QuestionSettingType";

const MainScreen:FC<{}>=()=>{

    const [menu,setMenu]=useState(0);

    const [questionSetting,setQuestionSetting]=useState<QuestionSettingType>({
        target:"default",order:0,timeLimit:5,number:10
    });
    const saveQuestionSetting=(data:QuestionSettingType)=>{
        //error データが登録されない
        setQuestionSetting({...data});
    }

    const defaultQuestions=[
        "一番好きな動物は何ですか？",
        "一番好きな食べ物は何ですか？",
        "一番嫌いな食べ物は何ですか?",
        "犬派？猫派?",
    ];

    //ダミーデータ
    // const defaultQuestions=[...Array(10)].map((_,i)=>i.toString());

    const [questions,setQuestions]=useState(defaultQuestions);

    const setNewQuestions=()=>{
        if(questionSetting.order===0){
            setQuestions(randomArray<string>(questions));
        }
    }
    const [isLastQuestion,setIsLastQuestion]=useState(false);
    const nextQuestion=()=>{
        setQuestions(questions.filter((_,i)=>i>0));
        if(questions.length===2){
            setIsLastQuestion(true);
        }
    }

    const openMainScreen=()=>setMenu(0)
    const openStartScreen=()=>setMenu(1);
    const openQuestionScreen=()=>{
        setMenu(2);
        setQuestions(defaultQuestions);
        setNewQuestions();
        setIsLastQuestion(false);
    }
    const openFinishScreen=()=>setMenu(3);

    return (
    <div>
        {menu===0&&(
            <MainButtonGroup
                topButtonClick={openStartScreen}
            />
        )}
        {menu===1&&(
            <StartScreen
                startButtonClick={openQuestionScreen}
                backButtonOnClick={openMainScreen}
                saveQuestionSetting={saveQuestionSetting}
            />
        )}
        {menu===2&&(
            <QuestionScreen
                question={questions[0]}
                timeLime={questionSetting.timeLimit}
                isLastQuestion={isLastQuestion}
                nextButtonClick={nextQuestion}
                endButtonClick={openMainScreen}
                finishButttonClick={openFinishScreen}
            />
        )}
        {menu===3&&(
            <FinishScreen
                finishButttonClick={openMainScreen}
                oneMoreButtonClick={openStartScreen}
            />
        )}
     
    </div>
    )
}

export default MainScreen;