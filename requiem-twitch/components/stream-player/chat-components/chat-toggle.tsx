"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { initFlowbite } from "flowbite";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useEffect } from "react";

export const ChatToggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useChatSidebar((state)=> state);

    useEffect(() => {
        initFlowbite();
    }, [collapsed]);

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const onToggle = () => {
        if(collapsed){
            onExpand();
        }
        else {
            onCollapse();
        }
    };

    return(
        <>
            <div id="tooltip-right-chat" role="tooltip" 
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {collapsed ? "Expand" :"Collapse"}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-right-chat" data-tooltip-placement="right" type="button"  
                className="h-auto p-2 ml-auto hover:bg-slate-500 rounded" 
                onClick={onToggle}
            >
                <Icon className="h-4 w-4" color="white"/>
            </button>
        </>

    );
}