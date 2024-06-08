"use client"

import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export const Toggle = () => {
    const {
        collapsed,
        disappeared,
        onExpand,
        onCollapse
    } = useDashboardSidebar((state) => state);

    useEffect(() => {
        initFlowbite();
    }, [collapsed]);

    return(
        <>
            {(collapsed && !disappeared) && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <button 
                    data-tooltip-target="tooltip-right-sidebar" data-tooltip-placement="right" type="button" 
                        className="h-auto p-2 hover:bg-slate-500 rounded" 
                        onClick={onExpand}
                    >
                        <ArrowRightFromLine className="h-4 w-4" color="white"/>
                    </button>
                    <div id="tooltip-right-sidebar" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Expand
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            )}
            {(!collapsed && !disappeared) && (
                <div className="p-3 pl-2 mb-2 hidden lg:flex items-center w-full">
                    <p className="font-semibold text-white">
                        Dashboard
                    </p>
                    <button data-tooltip-target="tooltip-right-sidebar" data-tooltip-placement="right" type="button"  
                        className="h-auto p-2 ml-auto hover:bg-slate-500 rounded" 
                        onClick={onCollapse}
                    >
                        <ArrowLeftFromLine className="h-4 w-4" color="white"/>
                    </button>
                    <div id="tooltip-right-sidebar" role="tooltip" 
                        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Collapse
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            )}
        </>
    );
}