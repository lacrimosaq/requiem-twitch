"use client"

import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import * as React from "react";
import { cn } from "@/utils/cn";

interface WrapperProps{
    children: React.ReactNode;
}

export const Wrapper = ({children} : WrapperProps) => {
    const {collapsed, disappeared} = useDashboardSidebar((state) => state);

    return(
        <aside className={cn(
            "fixed left-0 flex flex-col h-full bg-slate-950 w-[60px] lg:w-[256px]  border-r border-[#2d2E35] z-50",
             (disappeared ? " w-[0px] lg:w-0" : collapsed ?  " lg:w-[60px]" : " "))
        }>
            {children}
        </aside>
    );
}