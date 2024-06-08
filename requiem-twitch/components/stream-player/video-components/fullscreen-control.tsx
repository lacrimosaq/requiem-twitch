"use client";

import { initFlowbite } from "flowbite";
import { Maximize, Minimize } from "lucide-react";
import { useEffect } from "react";

interface FullscreenControlProps{
    isFullscreen: boolean;
    onToggle: () => void;
}

export const FullscreenControl = ({
    isFullscreen,
    onToggle
} : FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;

    useEffect(() => {
        initFlowbite();
    }, []);
    
    return(
        <div className="flex items-center justify-center">
            <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button onClick={onToggle} className="text-white hover:bg-slate-400 rounded">
                <Icon className="h-5 w-5"/>
            </button>

        </div>
    );
}