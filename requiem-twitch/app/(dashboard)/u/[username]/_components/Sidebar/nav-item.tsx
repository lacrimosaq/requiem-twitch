"use client";

import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive: boolean;
}

export const NavItem= ({
    icon: Icon, 
    label,
    href,
    isActive
}: NavItemProps) => {
    const{
        collapsed,
        disappeared
    } = useDashboardSidebar((state)=> state);

    return(
        !disappeared &&
        <div className="px-1">
        <button className={cn("flex w-full h-12 mb-2 items-center rounded",
            collapsed ? "justify-center" : "justify-start",
            isActive ? "bg-red-600" : "hover:bg-slate-400"
        )}>
            <Link href={href} className={!collapsed ? "w-full" : ""}>
                <div className="flex items-center gap-x-4 py-3">
                    <Icon color="white" className={cn(
                        "h-5 w-5",
                        collapsed ? "mr-0" : "ms-4 mr-2"
                    )} />
                    {!collapsed &&
                        <span className="font-semibold text-white">{label}</span>
                    }
                </div>
            </Link>
        </button></div>
    );
}