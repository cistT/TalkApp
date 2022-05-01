import { CSSProperties, FC } from "react";

import { Button, styled } from "@material-ui/core";

const MyStyleButton=styled(Button)({
    height:'60px',
    width:'60px',
})

const QuadrangleButton:FC<{
    label?:string,
    onClick?:()=>void
    style?:CSSProperties
}>=({
    label="",
    onClick=()=>undefined,
    style
})=>{

    return (
    <>
        <MyStyleButton
            style={style}
            variant="outlined"
            onClick={onClick}
        >
            {label}
        </MyStyleButton>
    </>
    )
}

export default QuadrangleButton;