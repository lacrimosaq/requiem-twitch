"use client";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

import { useSidebar } from "@/store/use-sidebar";
import { Tooltip } from "@nextui-org/tooltip";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSidebar((state) => state);

    useEffect(() => {
        initFlowbite();
    }, [collapsed]);

    return(
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <button 
                    data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" 
                        className="h-auto p-2 hover:bg-slate-500 rounded" 
                        onClick={onExpand}
                    >
                        <ArrowRightFromLine className="h-4 w-4" color="white"/>
                    </button>
                    <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Expand
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-2 mb-2 hidden lg:flex items-center w-full">
                    <p className="font-semibold text-white text-xl">
                        For You
                    </p>
                    <button data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button"  
                        className="h-auto p-2 ml-auto hover:bg-slate-500 rounded" 
                        onClick={onCollapse}
                    >
                        <ArrowLeftFromLine className="h-4 w-4" color="white"/>
                    </button>
                    <div id="tooltip-right" role="tooltip" 
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Collapse
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            )}
        </>
    );
}

export const ToggleSkeleton = () => {
    return(
        <div className="lg:hidden p-3 pl-2 mb-2 flex items-center w-full">
            <p className="font-semibold text-white text-xl">
                For You
            </p>
            <button data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button"  
                className="h-auto p-2 ml-auto hover:bg-slate-500 rounded" 
            >
                <ArrowLeftFromLine className="h-4 w-4" color="white"/>
            </button>
        </div>
    );
}