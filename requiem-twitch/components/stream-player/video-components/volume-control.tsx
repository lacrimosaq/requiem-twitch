"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useEffect } from "react";

interface VolumeControlProps {
    onToggle: () => void;
    onChange: (number) => void;
    value: number;
    isMuted: boolean;
}

export const VolumeControl = ({
    onToggle,
    onChange,
    value,
    isMuted
} : VolumeControlProps) => {
    let Icon = Volume1;

    if(value === 0 || isMuted){
        Icon = VolumeX;
    }
    else if(value > 50){
        Icon = Volume2;
    }

    const handleSliderChange = (value: number) => {
        onChange(value);
    }

    return(
        <div className="flex items-center">
            <div id="tooltip-right" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {value === 0 ? "Unmute" : "Mute"}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        <button onClick={onToggle} className="text-white hover:bg-slate-400 rounded">
            <Icon className="h-5 w-5"/>
        </button>
        <input id="small-range" type="range" onChange={(e) => {handleSliderChange(e.target.valueAsNumber)}} value={[value].toString()} step={1} max={100} className="w-[7rem] h-1 mx-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"/>

            
        </div>
    );

} 