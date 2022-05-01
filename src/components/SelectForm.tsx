import { FC } from "react";
import {UseFormRegisterReturn } from "react-hook-form";

import { InputLabel, NativeSelect, styled } from "@material-ui/core";

const MyStyleInputLabel =styled(InputLabel)({
    height:'30px',
    marginTop:'10px',
    fontSize:'20px',
    color:'black',
    fontFamily: 'Roboto',
})

const MyStyleNativeSelect=styled(NativeSelect)({
    height:'50px',
    width:'90vw',
    marginBottom:'10px',
})

const SelectForm:FC<{
    label?:string,
    defaultValue?:string|undefined,
    questions:{question:string,value:string|number}[],
    register:UseFormRegisterReturn
}>=({
    label="質問",
    defaultValue=undefined,
    questions,
    register
})=>{

    return (
    <>
        <MyStyleInputLabel variant="standard">
            {label}
        </MyStyleInputLabel>
        <MyStyleNativeSelect
            defaultValue={defaultValue}
            {...register}
        >
            {questions.map((question)=>(
                <option
                    key={question.question}
                    value={question.value}
                    style={{textAlign:'center'}}
                >
                    {question.question}
                </option>
            ))}
        </MyStyleNativeSelect>
    </>
    )
}

export default SelectForm;