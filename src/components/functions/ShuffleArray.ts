type ShuffleArray=<T>(array:T[])=>T[];

    const shuffleArray:ShuffleArray=(array)=>{
        const newArray=[...array];

        for(let i=newArray.length-1;0<i;i--){
            const random=Math.floor(Math.random()*(i+1));
            let tmp=newArray[i];
            newArray[i]=newArray[random];
            newArray[random]=tmp;

        }
        return newArray;
    }

    export default shuffleArray;