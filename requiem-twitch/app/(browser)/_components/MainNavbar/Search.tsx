"use client";
import { useEffect, useState } from "react";
import {SearchIcon, X} from "lucide-react"
import { useRouter } from "next/navigation";
import qs from 'query-string'
import { useMediaQuery } from "usehooks-ts";

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const matches = useMediaQuery("(max-width: 576px)");

    useEffect(() =>{
        if(matches){
            setPlaceholder("");
        }
        else{
            setPlaceholder("Search");
        }
    }, [matches])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value) return;

        const url = qs.stringifyUrl({
            url: "/search",
            query: {term: value},
        }, {skipEmptyString: true});
        router.push(url);
    }

const onClear = () => {
    setValue("");
}

    return(
        <form onSubmit={onSubmit} className="flex w-1/4">
            <input type="search" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="relative w-full  flex items-center focus:ring-red-600 focus:border-red-500 focus:outline-none focus:border-2
                p-2.5 text-sm text-neutral-100 bg-slate-950 rounded-s-lg border-s-gray-700 border-s-2 border border-gray-700  hover:border-gray-500   " 
                placeholder={placeholder} required />
            {
                // <X
                //     className="absolute top-2.5 right-14 h-5 w-5 cursor-pointer hover:opacity-75 transition"
                // />
            }
            <button type="submit" className="block p-2.5 text-sm font-medium text-white bg-neutral-900 rounded-e-lg border border-gray-700 hover:bg-neutral-950 ">
                <SearchIcon className="w-4 h-5"/>
            </button>
        </form>
    );
}