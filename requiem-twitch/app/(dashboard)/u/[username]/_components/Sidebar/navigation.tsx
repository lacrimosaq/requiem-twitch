"use client";

import { Radio, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "./nav-item";

interface User {
    id: string| null;
    username: string| null;
}

export const Navigation = () => {
    const pathname = usePathname();
    const [user, setUser] = useState<User>({id: "", username: ""});
    const routes = [
        {
            label: "Stream",
            href: `/u/${user.username}/stream`,
            icon: Radio,
        },
        {
            label: "Keys",
            href: `/u/${user.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user.username}/community`,
            icon: Users,
        },
    ];

    useEffect(() => {
        setUser({
            id: localStorage.getItem("id"),
            username: localStorage.getItem("username"),
        });
        
    }, []);

    return(
        <ul>
            {routes.map((route) => 
            <NavItem
            key={route.href}
            label={route.label}
            href={route.href}
            icon={route.icon}
            isActive={pathname === route.href}
            />
            )}
        </ul>
    );
}