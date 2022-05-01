type StartScreenType={
    startButtonClick?:()=>void
    backButtonOnClick?:()=>void
    saveQuestionSetting?:(data:{target:string,order:number,timeLimit:number,number:number})=>void
}

export default StartScreenType;