type StartScreenType={
    startButtonClick?:()=>void
    backButtonOnClick?:()=>void
    saveQuestionSetting?:(data:{target:string,order:number,timeLimit:number,number:number})=>void,
    questionsStore:{id:string,name:string,questions:string[]}[]
}

export default StartScreenType;