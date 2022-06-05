import { auth } from "../../../firebase";

import { Button } from "@mui/material";

const SignOutButton = () => {
    const signOut = () => auth.signOut();
    return (
        <Button color="inherit" onClick={signOut}>
            サインアウト
        </Button>
    );
};

export default SignOutButton;
