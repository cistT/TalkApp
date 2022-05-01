import { Button } from "@material-ui/core";
import { FC } from "react";


const TwoLineTextButton:FC<{
    mainText:string;
    subText?:string;
    height?:string;
    width?:string;
}>=({
    mainText,subText,height="60px",width="60px"
})=>{

    return (
    <>
        <Button style={{height,width}}>
            <div style={{display: 'block',justifyContent: 'center'}}>
                <h2>{mainText}</h2>
                <h5>{subText}</h5>
            </div>
        </Button>

    </>
    )
}

export default TwoLineTextButton;