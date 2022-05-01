import { CSSProperties, FC } from "react";

import { ButtonGroup, styled } from "@material-ui/core";

import CircleButton from "../Buttons/CircleButton";
import QuadrangleButton from "../Buttons/QuadrangleButton";
import MainButtonGroupType from "../types/MainButtonGroupType";

const MyStyleMainButtonGroup=styled(ButtonGroup)({
    width:'100vw',
    height:'300px',
    textAlign:'center',
    position:'fixed',
    bottom:'5%',
    display:'block',
})

const MyStyleSubButtonGroup=styled(ButtonGroup)({
    marginTop:'30px',
    display: 'flex',
    justifyContent: 'center',
})

const quadrangleStyle:CSSProperties={
    height:'20vh',width:'33vw'
}

const CircleButtonStyle:CSSProperties={
    height:'150px',width:'150px'
}

const MainButtonGroup:FC<MainButtonGroupType>=({
    topButtonClick
})=>{

    return (
    <MyStyleMainButtonGroup>

        <CircleButton
            label="スタート"
            onClick={topButtonClick}
            style={CircleButtonStyle}
        />

        <MyStyleSubButtonGroup>
            <QuadrangleButton
                label="フリー"
                style={quadrangleStyle}
            />
            <QuadrangleButton
                label="質問"
                style={quadrangleStyle}
            />
            <QuadrangleButton
                label="メニュー"
                style={quadrangleStyle}
            />
        </MyStyleSubButtonGroup>
    </MyStyleMainButtonGroup>
    )
}

export default MainButtonGroup;