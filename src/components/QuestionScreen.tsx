import { CSSProperties, FC } from "react";
import { useTimer } from 'react-timer-hook';

import CircleButton from "../Buttons/CircleButton";
import Quadrangle from "../Buttons/QuadrangleButton";

import { ButtonGroup,  styled,  Typography } from "@material-ui/core";
import QuestionScreenType from "../types/QuestionScreenType";


const MyStyleTypoGraphyTitle=styled(Typography)({
    height:'5vh',
    margin:'5px 0 5px 30px',
});

const MyStyleTypographyQuestion=styled(Typography)({
    height:'10vh',
    width:'100vw',
    textAlign:'center',
    marginBottom: '30px'
});

const MyStyleTypographyCountDown = styled(Typography)({
    height:'20vh',
    textAlign:'center',
    marginBottom:'10px',
})
const  CountDownButtonGroup=styled(ButtonGroup)({
    height:'20vh',
    display:'flex',
    justifyContent:'center',
})
const QuadrangleStyle:CSSProperties={
    height:'15vh',
    width:'33vw',
}
const CircleButtonStyle:CSSProperties={
    height:'80px',
    width:'130px',
}
const MyStyleButtonGroup=styled(ButtonGroup)({
    display:'flex',
    justifyContent:'space-around',
})

const QuestionScreen:FC<QuestionScreenType>=({
    question,
    isLastQuestion,
    timeLime=5,
    nextButtonClick,
    endButtonClick,
    finishButttonClick
})=>{
    const time = new Date();
    time.setSeconds(time.getSeconds() + 60*timeLime);
    const {
        seconds,
        minutes,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp:time });

    return (
    <>
        <MyStyleTypoGraphyTitle variant="h5">
            質問
        </MyStyleTypoGraphyTitle>
        <MyStyleTypographyQuestion variant="h4">
            {question}
        </MyStyleTypographyQuestion>

        {/* ToDo カウントダウンの部分は別のコンポーネントに分ける */}
        <MyStyleTypographyCountDown variant="h1">
            <span>{minutes}</span>
                :
            <span>{seconds.toString().length===1?`0${seconds.toString()}`:seconds}</span>
        </MyStyleTypographyCountDown>

        <CountDownButtonGroup>
            <Quadrangle
                label="再開する"
                onClick={resume}
                style={QuadrangleStyle}
            />
            <Quadrangle
                label="一時停止"
                onClick={pause}
                style={QuadrangleStyle}
            />
            <Quadrangle
                label="リスタート"
                onClick={()=>restart(time)}
                style={QuadrangleStyle}
            />
        </CountDownButtonGroup>

        <MyStyleButtonGroup>
            <CircleButton
                label="終了する"
                onClick={endButtonClick}
                style={CircleButtonStyle}
            />
            {isLastQuestion?(
                <CircleButton
                    label="終了"
                    onClick={finishButttonClick}
                    style={CircleButtonStyle}
                />):(
                    <CircleButton
                        label="次の質問へ"
                        onClick={()=>{
                            restart(time);
                            nextButtonClick();
                        }}
                        style={CircleButtonStyle}
                    />
                )}
        </MyStyleButtonGroup>
    </>
    )
}

export default QuestionScreen;