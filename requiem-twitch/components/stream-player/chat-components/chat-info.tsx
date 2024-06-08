import { useMemo } from "react";

interface ChatInfoProps{
   chatDelayed : number;
   isChatFollowersOnly: boolean;
};

export const ChatInfo = ({
    chatDelayed,
    isChatFollowersOnly
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if(isChatFollowersOnly) return "You need to be a follower to chat.";
        else if(chatDelayed > 0) return "Chat delayed by " + chatDelayed + "(s)";
        return "";
    }, [chatDelayed, isChatFollowersOnly]);
    const label = useMemo(() => {
        if(isChatFollowersOnly) return "Followers-Only Chat";
        else if(chatDelayed > 0) return "Slow-mode Chat";
        return null;
    }, [chatDelayed, isChatFollowersOnly]);

    return(
        <div
            data-tooltip-target="tooltip-up-info" data-tooltip-placement="top" 
            className="p-2 text-white bg-slate-800 border border-slate-600 w-full rounded-t-md flex items-center gap-x-2"
        >
            <div id="tooltip-up-info" role="tooltip" 
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {hint}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    );
}