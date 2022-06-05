import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";

import { Button } from "@mui/material";

const SignInButton = () => {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    };
    return (
        <Button color="inherit" onClick={signInWithGoogle}>
            ログイン
        </Button>
    );
};

export default SignInButton;
