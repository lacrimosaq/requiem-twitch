"use-client";

import { useState } from "react";
import { ChatInfo } from "./chat-info";
import { Tv2Icon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatInputProps {
    onSubmit: () => void;
    value: string;
    onChange: (string) => void;
    stream: any;
    isFollowing: boolean;
    isHost: boolean;
};

export const ChatInput = ({
    onSubmit,
    value,
    onChange,
    stream,
    isFollowing,
    isHost
}: ChatInputProps) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);
    const isDisabled = isDelayBlocked || (stream.followerChat && !isFollowing);
    console.log("stream.followerChat = " + stream.followerChat);
    console.log("stream.cahtdelay = " + stream.chatDelay);
    console.log("isFollowing = " + isFollowing);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if(!isDelayBlocked && stream.chatDelay > 0){
            onSubmit();
            setIsDelayBlocked(true);
            setTimeout(() =>{
                setIsDelayBlocked(false);
            }, stream.chatDelay*1000);
        }
        else onSubmit();
    }

    return(
        <form 
            onSubmit={(e) => {handleOnSubmit(e)}}
            className="flex flex-col items-center p-3"
        >
            <div className="w-full">
                <ChatInfo
                    chatDelayed={stream.chatDelay}
                    isChatFollowersOnly={stream.followerChat}
                    isDelayBlocked={isDelayBlocked}
                    isFollowing={isFollowing}
                />
                
                <div className="w-full relative flex items-center">
                    {isHost && (<><button  data-tooltip-target="tooltip-up-identity" data-tooltip-placement="top" className="absolute left-2 p-1 rounded bg-blue-500 text-white " >
                        <Tv2Icon className="w-5 h-5"/>
                    </button>
                    <div id="tooltip-up-identity" role="tooltip" 
                        className="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        {"Chat Identity"}
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div></>)}
                    <input 
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                        disabled={isDisabled}
                        placeholder="Send a message"
                        className={cn("block w-full  p-2 text-neutral-100 border border-gray-700 py-2.5 rounded-md bg-slate-950 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none focus:border-red-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            isHost && "pl-10",
                            stream.followerChat || isDelayBlocked && "rounded-t-none"
                        )}
                    />
                </div>
            </div>
            <div className="ml-auto">
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 disabled:bg-red-800 disabled:text-gray-300  my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Chat
                </button>
            </div>
        </form>
    );
}

export const ChatInputSkelethon = () => {
    return(
        <div className="flex flex-col items-center p-3">
            <Skeleton className="w-full h-10"/>
            <div className="flex items-center ml-auto">
                <Skeleton className="w-7 h-7"/>
                <Skeleton className="w-7 h-12"/>
            </div>
        </div>
    );
}