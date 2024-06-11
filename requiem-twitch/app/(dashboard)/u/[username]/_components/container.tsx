"use client"

import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps{
    children:React.ReactNode;
};


export const Container = ({
    children,
}: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const {
        collapsed,
        disappeared,
        onCollapse,
        onExpand,
    } = useDashboardSidebar((state) => state);

    useEffect(() =>{
        if(matches){
            onCollapse();
        }
        else{
            onExpand();
        }
    }, [matches, onCollapse, onExpand])

    return(
        <div className={cn(
        "flex-1 lg:ml-[256px] ml-[60px]",
        (disappeared ? " lg:ml-[0px] ml-[0px]" :  collapsed ? " lg:ml-[60px]" : " "))
        }>
            {children}
        </div>
    )
}