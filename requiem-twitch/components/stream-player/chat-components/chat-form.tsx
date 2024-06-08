"use-client";

import { useState } from "react";
import { ChatInfo } from "./chat-info";
import { Tv2Icon } from "lucide-react";
import { cn } from "@/utils/cn";

interface ChatInputProps {
    onSubmit: () => void;
    value: string;
    onChange: (string) => void;
    isChatFollowersOnly: boolean;
    chatDelay: number;
    isFollowing: boolean;
    isHost: boolean;
};

export const ChatInput = ({
    onSubmit,
    value,
    onChange,
    isChatFollowersOnly,
    chatDelay,
    isFollowing,
    isHost
}: ChatInputProps) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);
    const isDisabled = isDelayBlocked || (isChatFollowersOnly && !isFollowing);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if(!isDelayBlocked && chatDelay > 0){
            setIsDelayBlocked(true);
            setTimeout(() =>{
                setIsDelayBlocked(false);
                onSubmit();
            }, chatDelay*1000);
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
                    chatDelayed={chatDelay}
                    isChatFollowersOnly={isChatFollowersOnly}
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
                        className={cn("block w-full  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            isHost && "pl-10"
                        )}
                    />
                </div>
            </div>
            <div className="ml-auto">
                <button
                    type="submit"
                    disabled={false}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Chat
                </button>
            </div>
        </form>
    );
}