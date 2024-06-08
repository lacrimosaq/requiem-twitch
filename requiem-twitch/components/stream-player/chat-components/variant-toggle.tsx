"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { initFlowbite } from "flowbite";
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react";
import { useEffect } from "react";

export const VariantToggle = () => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state)=> state);

    useEffect(() => {
        initFlowbite();
    }, [variant]);

    const Icon = variant === ChatVariant.CHAT ? Users : MessageSquare;
    const onToggle = () => {
        onChangeVariant(variant === ChatVariant.CHAT ? ChatVariant.COMMUNITY : ChatVariant.CHAT);
    };

    return(
        <>
            <div id="tooltip-right-variable" role="tooltip" 
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {variant === ChatVariant.CHAT ? "Community" : "Chat"}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-right-variable" data-tooltip-placement="right" type="button"  
                className="h-auto p-2 ml-auto hover:bg-slate-500 rounded" 
                onClick={onToggle}
            >
                <Icon className="h-4 w-4" color="white"/>
            </button>
        </>

    );
}