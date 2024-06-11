"use client";

import { VerifiedMark } from "@/components/verified-mark";

interface AboutCardProps{
    hostName:string;
    hostInfo:string;
    followersCount:number;
}
export const AboutCard = ({
    hostName,
    hostInfo,
    followersCount
}:AboutCardProps) => {
    

    return(
        <div className="my-6 px-14">
            <div className="text-white flex items-center text-lg lg:text-xl mb-1 font-semibold">
                About {hostName}
                <div className="mx-2"><VerifiedMark /></div>
            </div>
            <div className="group rounded-md bg-slate-900 p-3 mt-2 lg:p-5 flex flex-col ">
                {/* <div className=" items-center justify-between">
                </div> */}
                <div className="text-sm text-white mb-2">
                    <span className="font-bold">{followersCount}</span>{followersCount === 1 ? " follower" : " followers"}
                </div>
                <p className="text-sm text-white">
                    {hostInfo || "We don't know much about them, but we're sure "+hostName+" is great person."}
                </p>
            </div>
        </div>
    );
}