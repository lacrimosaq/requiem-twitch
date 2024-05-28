"use client"

import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { Menu } from "lucide-react";
import Link from "next/link"

export const Logo = () => {
    const {
        disappeared,
        onAppeared,
        onDisappeared
    } = useDashboardSidebar((state) => state)

    return(
        <div className="flex justify-between items-center"> 
            <button 
            data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button" 
                className="h-auto p-2 hover:bg-slate-500 rounded" 
                onClick={disappeared ? onAppeared : onDisappeared}
            >
                <Menu className="h-6 w-6" color="white"/>
            </button>
            <span className="font-semibold text-white p-1">Dashboard</span>
        </div>
        // <Link href="/">
        //     <div className="bg-white rounded-full p-1">
        //         <img src="/logo.svg" alt="RequiemLogo" width={"45px"} height={"45px"}/>
        //     </div>
        // </Link>>
    );
}