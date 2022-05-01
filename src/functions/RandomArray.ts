type RandomArray=<T>(array:T[])=>T[];

    const randomArray:RandomArray=(array)=>{
        const beforeArray=[...array];
        const afterArray=[];
        for(let i=0;i<array.length;i++){
            const random=Math.floor(Math.random()*beforeArray.length);
            afterArray.push(beforeArray.slice(random,random+1)[0]);
        }
        return afterArray;
    }

    export default randomArray;