"use client";
import { signOut } from "next-auth/react";
const Dasboard = () => {
    return (
        <div>
            Dasboard
            <button onClick={() => signOut()}>Logout</button>
        </div>
    );
};

export default Dasboard;
