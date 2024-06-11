"use client";

import { stringToColor } from "@/utils/stringToColor";
import { ReceivedChatMessage } from "@livekit/components-react";
import { Tv2Icon } from "lucide-react";

interface ChatMessageProps{
    hostName: string;
    data: ReceivedChatMessage;
};

export const ChatMessage = ({
    hostName,
    data
}: ChatMessageProps) => {
    const color = stringToColor(data.from?.name || "");
    console.log(hostName === data.from?.name);

    return(
        <div className="flex p-2 rounded-md hover:bg-slate-900">
            <div className="flex flex-wrap items-baseline grow">
            {hostName === data.from?.name  && (<>
            <button  data-tooltip-target="tooltip-up-chat-role" data-tooltip-placement="top" className="block p-1 mr-1 rounded bg-blue-500 text-white " >
                <Tv2Icon className="w-3 h-3"/>
            </button>
            <div id="tooltip-up-chat-role" role="tooltip" 
                className="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {"Host"}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div></>)}
                <p className="text-sm font-semibold whitespave-nowrap">
                    <span className="truncate" style={{color: color}}>
                        {data.from?.name}
                        
                    </span>
                </p>
                <p className="text-sm break-all text-white">
                    {": "+ data.message}
                </p>
            </div>
        </div>
    );
}