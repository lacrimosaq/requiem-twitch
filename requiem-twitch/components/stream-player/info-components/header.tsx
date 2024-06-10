"use client";

import { VerifiedMark } from "@/components/verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Avatar } from "flowbite-react";
import { UserIcon } from "lucide-react";
import { FollowButton } from "./follow-button";

interface HeaderProps{
    hostName: string;
    hostIdentity: number;
    viewerIdentity: string;
    avatar: string;
    isFollowing: boolean;
    streamName: string;
}

export const Header = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    avatar,
    isFollowing,
    streamName,
}: HeaderProps) => {

    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity.toString());
    const isLive = !!participant;
    console.log("hostIdentity" + hostIdentity);
    console.log("viewerIdentity" + viewerIdentity);

    return(
        <div className="flex flex-col lg:flex-row items-start  px-4">
            <Avatar alt="User avatar" img={"data:image/jpeg;base64," + avatar} size="lg" className="py-3 mr-1" rounded bordered color="red"/>
            <div className="space-y-1">
                <div className="flex items-center pt-3">
                    <h2 className="text-lg text-white font-semibold mr-1">
                        {hostName}
                    </h2>
                    <VerifiedMark/>
                </div>
                <p className="text-sm text-white">{streamName}</p>
                {isLive ? (
                    <div className="font-semibold flex items-center text-xs text-rose-500">
                        <UserIcon className="h-4 w-4"/>
                        <p className="">
                            {participants.length + " viewer(s)"}
                        </p>
                    </div>
                ):(
                <p className="text-sm pt-1 text-slate-400">
                    Offline
                </p>)}
            </div>
            {!viewerIdentity.includes("host") && 
            <div className="lg:ml-auto pt-3">
            <FollowButton
                hostIdentity={hostIdentity}
                isFollowing={isFollowing}
            /></div>}
        </div>
    );
}