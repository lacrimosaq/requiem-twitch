"use client"
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
                "fixed left-0 flex flex-col h-full bg-slate-700  w-[60px] lg:w-[256px]   border-r border-[#2d2E35] z-50"
                + (collapsed ? " w-[60px]" : " w-[256px]")
            }
        >
            {children}
        </aside>
    );
}
