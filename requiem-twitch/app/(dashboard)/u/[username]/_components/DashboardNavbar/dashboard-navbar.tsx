"use client"

import { AvatarMenu } from "./avatar-menu";
import { useState, useEffect } from 'react';
import { Logo } from "./logo";

export const DashboardNavbar = () => {
    const [jwtToken, setJwtToken] = useState<string| null>(null);

    useEffect(() => {
        setJwtToken(localStorage.getItem("jwtToken"));
    }, [jwtToken]);
    return (
        <nav className="top-0 w-full h-20 border-b border-slate-950 bg-slate-900 px-2 lg:px-4 flex justify-between items-center">
            <Logo/>
            <AvatarMenu setJwtToken={setJwtToken}/>
        </nav>
    );
}