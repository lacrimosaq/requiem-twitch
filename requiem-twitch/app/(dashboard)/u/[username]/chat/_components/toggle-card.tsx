"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { initFlowbite } from "flowbite";
import { cn } from "@/utils/cn";

type FieldType = "chatDelay"|"followerChat";

interface ToggleCardProps {
    label: string;
    valueBoolean: boolean| undefined;
    valueNumber : number| undefined;
    field: FieldType;
}

export const ToggleCard = ({
    label,
    valueBoolean,
    valueNumber,
    field,
}: ToggleCardProps) =>{
    const [isLoading, setIsLoading] = useState<boolean| undefined>(false);
    const [valueBool, setValueBool] = useState<boolean| undefined>(valueBoolean);
    const [valueInt, setValueInt] = useState<number| undefined>(valueNumber);

    const handleBoolean = () => {
        let value = !valueBool;
        setValueBool(value);
        ChangeData(value);
    }
    const handleNumber = (value) => {
        ChangeData(valueInt);
    }
    const changeNumber = (value) => {
        if(value < 0 || value > 50) return;
        setValueInt(value);
    }
    useEffect(() => {
        initFlowbite;
    }, []);

    const ChangeData =  (value) => {
        setIsLoading(true);
        let streamobj = {
            [field] : value,
        };
        fetch("http://localhost:8080/stream/edit/" + localStorage.getItem("id"), {
            method: "PUT",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json'},
            body: JSON.stringify(streamobj)
            // headers: headers,
        }).then(resp => {
            if (!resp.ok) {
              return resp.text().then(text => { throw new Error(text); });
            }
            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              return resp.json();
            } else {
              return resp.text();
            }
        }).then(json => {
            // setStream(json);
            toast.success("Your data was successfully updated!");
        }).catch((err) => {
            toast.error('Failed :' + err.message);
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });

    }
    return(
        <div className="rounded-xl bg-slate-600 p-6  mb-3">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                {valueBoolean !== undefined &&
                <div className="space-y-2">
                    
                    <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" onChange={handleBoolean}  className="sr-only peer" checked={valueBool} disabled={isLoading}/>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>}
                {valueNumber !== undefined &&
                <div className="space-y-2">
                    
                    <div className="relative flex items-center max-w-[8rem]">
                        
                        <input 
                        type="number" 
                        id="quantity-input" 
                        // data-input-counter data-input-counter-min="1" 
                        // data-input-counter-max="50" 
                        aria-describedby="helper-text-explanation" 
                        className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 rounded-s focus:border-blue-500 block w-full py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                         
                        placeholder="ms" 
                        value={valueInt}
                        onChange={(e) => changeNumber(e.target.value)}
                        disabled={isLoading}
                        required />
                        <button 
                            type="button" 
                            onClick={handleNumber} 
                            className={cn("block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-e",
                                isLoading === true ? "bg-blue-700" : "bg-blue-500"
                            )}
                            disabled={isLoading}
                        >
                            Save
                        </button> 
                    </div>
                </div>}
            </div>
        </div>
    );
}