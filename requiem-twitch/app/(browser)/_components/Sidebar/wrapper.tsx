"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface WrapperProps{
    children:React.ReactNode;
};

export const Wrapper = ({
    children
}: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
    return(
        <aside
            className={
                cn("fixed left-0 flex flex-col h-full bg-slate-950  w-[60px] lg:w-[256px]   border-r border-[#2d2E35] z-50",
                    (collapsed ? " lg:w-[60px]" : " "))
            }
        >
            {children}
        </aside>
    );
}
