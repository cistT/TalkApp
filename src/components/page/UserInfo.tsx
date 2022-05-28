import React from "react";
import { auth } from "../../firebase";

const UserInfo = () => {
    return (
        <div>
            <img src={auth.currentUser?.photoURL ?? undefined} />
            <p>{auth.currentUser?.displayName}</p>
        </div>
    );
};

export default UserInfo;
