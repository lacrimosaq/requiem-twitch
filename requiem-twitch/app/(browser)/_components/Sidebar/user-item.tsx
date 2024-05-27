"use-client"

import { useSidebar } from "@/store/use-sidebar";
import { Avatar } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";

interface UserItemProps{
    username: string;
    avatar: string;
    isLive?: boolean;
};

export const UserItem = ({
    username,
    avatar,
    isLive
}: UserItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { collapsed } = useSidebar((state) => state);

    return (
        <button onClick={() => {router.push(`/${username}`);}} className={"flex px-2 w-full h-12 hover:bg-slate-600 items-center" 
        + (collapsed ? " justify-center" : " justify-start") }>
            <Avatar alt="User avatar" img={avatar} className={(isLive ? "grayscale-0 " : "grayscale ") + " w-10 "} rounded />
            {!collapsed && (
                <div className=" text-start">
                <p className="font-semibold text-white ms-3 text-sm">{username}</p>
                {(isLive ?<p className="text-white ms-3 text-sm">Dota 2</p> : null)}
                </div>
            )}
            {!collapsed &&( 
                isLive 
                ?(<div className="flex ml-auto mr-1 mb-auto mt-2">
                    <div className="rounded-full bg-red-500 w-[8px] h-[8px] my-auto mx-1"></div>
                    <p className="font-semibold text-white text-sm ">110</p>
                </div>)
                :(<div className="flex ml-auto mr-1">
                    <p className="text-white text-sm ">Offline</p>
                </div>))
            }
            
        </button>
    );
}