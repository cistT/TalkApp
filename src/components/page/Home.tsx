import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase";
import SignInButton from "../ui/button/SignInButton";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "./UserInfo";
import SignOutButton from "../ui/button/SignOutButton";

const Home = () => {
    const [user] = useAuthState(auth);
    return (
        <div>
            ログイン！
            {user ? (
                <>
                    <UserInfo />
                    <SignOutButton />
                </>
            ) : (
                <>
                    <SignInButton />
                </>
            )}
        </div>
    );
};

export default Home;
