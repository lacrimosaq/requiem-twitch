"use client";

import { Pencil } from "lucide-react";
import { InfoModal } from "./info-modal";
import Image from "next/image";

interface InfoCardProps{
    hostName:string;
    viewerIdentity:string;
    stream:any;
}

export const InfoCard = ({
    stream,
    viewerIdentity,
    hostName
}:InfoCardProps) => {
    
    if(!viewerIdentity.includes("host")) return null;

    return(
        <div className="my-6 px-14">
            <div className="rounded-xl bg-slate-950 border-[#2d2E35] border">
                <div className="flex items-center p-4">
                    <div className="rounded-md bg-blue-600 mr-2 p-2 h-auto w-auto">
                        <Pencil className="text-white h-5 w-5"/>
                    </div>
                    <div>
                        <h2 className="text-sm text-white lg:text-lg font-semibold capitalize">
                            Edit your stream data
                        </h2>
                        <p className="text-white text-xs lg:text-sm">
                            Maximize your visibility
                        </p>
                    </div>
                    <div className="ml-auto">
                    <InfoModal
                        stream={stream}
                    /></div>
                </div>
                <hr className=" border-[#2d2E35]"/>
                <div className="p-4 lg:p-6">
                    <div>
                        <h3 className="text-sm text-white mb-1">
                            Stream name
                        </h3>
                        <p className="text-sm font-semibold text-white">
                            {stream.name}
                        </p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm text-white mb-1">
                            Thumbnail
                        </h3>
                        {stream.thumbnail && (
                            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-slate-500">
                                <Image src={"data:image/jpeg;base64," + stream.thumbnail} alt="thumbnail" fill className="object-cover"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}