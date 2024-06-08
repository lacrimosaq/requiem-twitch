"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { Participant } from "livekit-client";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { CommunityItem } from "./community-item";
import { Tv2Icon, Users } from "lucide-react";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
};

export const ChatCommunity = ({
    hostName,
    viewerName
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounceValue<string>(value, 500);

    const participants = useParticipants();

    const filteredParticipants = participants.filter(participant =>
        (participant.name ?? '').toLowerCase().includes(value.toLowerCase())
    );
    return(
        <div className="p-4">
            <input 
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Filter"
                className="block w-full py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <hr className="my-5 -mx-4"/>
            <div className="-mx-4">
            <ScrollArea className="" >
                <p className="text-center text-white text-sm hidden last:block"> No results</p>
                
                {filteredParticipants.filter(participant => hostName === participant.name).length > 0 &&
                (<div className="flex px-4">
                    <button className="p-1 rounded bg-blue-500 text-white " >
                        <Tv2Icon className="w-4 h-4"/>
                    </button>
                    <span className="mx-2 text-white ">
                        Broadcast
                    </span></div>
                )}


                {filteredParticipants
                    .filter(participant => hostName === participant.name)
                    .map(participant => (
                        <CommunityItem 
                        key={participant.identity}  // It's good practice to use a unique key
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                        />
                    ))
                    }
                {filteredParticipants.filter(participant => hostName === participant.name).length > 0 && <hr className="my-5 -mx-4"/>}
                    
                {filteredParticipants.filter(participant => hostName !== participant.name).length > 0 &&
                (<div className="flex px-4">
                    <div className="p-1">
                        <Users className="w-4 h-4 text-white"/>
                    </div>
                    <span className="mx-2 text-white ">
                        Viewers
                    </span></div>
                )}
                {filteredParticipants
                    .filter(participant => hostName !== participant.name)
                    .map(participant => (
                        <CommunityItem 
                        key={participant.identity}  // Ensure a unique key is used
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                        />
                    ))
                }
                {filteredParticipants.filter(participant => hostName !== participant.name).length > 0 && <hr className="my-5 -mx-4"/>}
            </ScrollArea>
            </div>
        </div>
    );
}