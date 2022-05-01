type QuestionScreenType={
    question:string;
    isLastQuestion:boolean;
    timeLime?:number;
    nextButtonClick:()=>void;
    endButtonClick:()=>void;
    finishButttonClick:()=>void;
}
export default QuestionScreenType;