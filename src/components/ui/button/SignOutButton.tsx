import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { auth } from "../../../firebase";

const SignOutButton = () => {
    const signOut = () => auth.signOut();
    return (
        <div>
            <Button color="inherit" onClick={signOut}>
                サインアウト
            </Button>
        </div>
    );
};

export default SignOutButton;
