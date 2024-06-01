import { useState } from "react";
import { CopyButton } from "./copy-button";

interface KeyCardProps {
    value: string| null;
};

export const KeyCard = ({
    value
}: KeyCardProps) => {
    const [show, setShow] = useState(false); 
    return(
        <div className="rounded-xl bg-slate-600 p-6 mb-3">
            <div className="flex items-start">
                <p className="font-semibold shrink-0 pt-2">
                    Stream Key
                </p>
                <div className="w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <input 
                        className="bg-slate-800  mx-4 mb-3 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        value={value || ""}
                        type={show ? "text" : "password"}
                        disabled
                        placeholder="Stream key"
                        />
                        <CopyButton value={value || ""}/>
                    </div>
                    <a onClick={() => {setShow(!show)}} className="mx-4 font-medium text-white-600 dark:text-white-500 hover:underline" style={{cursor: "pointer"}}>
                        {show ? "Hide" : "Show"}
                    </a>
                </div>
            </div>
        </div>
    );
}