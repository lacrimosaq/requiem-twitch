"use client";
import { useState } from "react";
import {SearchIcon, X} from "lucide-react"
import { useRouter } from "next/navigation";
import qs from 'query-string'

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value) return;

        const url = qs.stringifyUrl({
            url: "/",
            query: {q: value},
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
                className="relative w-full  flex items-center focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 
                p-2.5 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-s-gray-50 border-s-2 border border-gray-300   " 
                placeholder="Search" required />
            {
                // <X
                //     className="absolute top-2.5 right-14 h-5 w-5 cursor-pointer hover:opacity-75 transition"
                // />
            }
            <button type="submit" className="block p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 ">
                <SearchIcon className="w-4 h-5"/>
            </button>
        </form>
    );
}