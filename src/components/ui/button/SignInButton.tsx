import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../../firebase";

const SignInButton = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };
    return (
        <div>
            <Button color="inherit" onClick={signInWithGoogle}>
                ログイン
            </Button>
        </div>
    );
};

export default SignInButton;
