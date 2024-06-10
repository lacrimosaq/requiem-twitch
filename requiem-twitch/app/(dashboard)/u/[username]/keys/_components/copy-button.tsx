"use client";

import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value?: string;
}

export const CopyButton = ({
    value
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        if(!value) return;
        setIsCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() =>{
            setIsCopied(false);
        }, 1000);
    }


    return(
        <button
        onClick={onCopy}
        disabled={!value || isCopied}

        >
            {isCopied ? <CheckCheck className="text-neutral-100"/> : <Copy className="text-neutral-100" size={"20px"}/>}
        </button>
    );
}