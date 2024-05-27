"use client"
import { Logo } from "./Logo";
import { FormButtons } from "./FormButtons";
import { Search } from "./Search";
import { AvatarMenu } from "./AvatarMenu";
import { useState, useEffect } from 'react';

export const MainNavbar = () => {
    const [jwtToken, setJwtToken] = useState<string| null>(null);

    useEffect(() => {
        setJwtToken(localStorage.getItem("jwtToken"));
    }, [jwtToken]);
    return (
        <nav className="top-0 w-full h-20 bg-gray-800 px-2 lg:px-4 flex justify-between items-center">
            <Logo/>
            <Search/>
            {jwtToken === null
                ? <FormButtons/>
                : <AvatarMenu setJwtToken={setJwtToken}/>
            }
        </nav>
    );
}