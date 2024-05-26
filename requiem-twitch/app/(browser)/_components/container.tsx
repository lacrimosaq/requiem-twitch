"use client"

import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps{
    children:React.ReactNode;
};


export const Container = ({
    children,
}: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 768px)");
    const {
        collapsed,
        onCollapse,
        onExpand,
    } = useSidebar((state) => state);

    useEffect(() =>{
        if(matches){
            onCollapse();
        }
        else{
            onExpand();
        }
    }, [matches, onCollapse, onExpand])

    return(
        <div className={
        "flex-1 "
        + (collapsed ? " ml-[60px]" : " md:ml-[256px] ml-[60px]")
        }>
            {children}
        </div>
    );
}