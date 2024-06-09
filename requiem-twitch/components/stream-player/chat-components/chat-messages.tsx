"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps{
    messages: ReceivedChatMessage[];
    hostName: string;
};

export const ChatMessages = ({
    messages,
    hostName
}: ChatMessagesProps) => {

    

    return(
        <>       
        {(!messages || messages.length === 0) ?
            (
                <div className="flex flex-1 items-center justify-center">
                    <p className="text-white">Welcome to the chat room!</p>
                </div>
            )
        
            :(
                <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full overflow-x-hidden">
                    {messages.map((message) => (
                        <ChatMessage 
                        hostName={hostName}
                        data={message}
                        />
                    ))}
                </div>
            )
        }
        </>

    );
};

export const ChatMessagesSkeleton = () => {
    return(
        <div className="flex h-full items-center justify-center">
            <Skeleton className="w-1/2 h-6"/>
        </div>
    );
}
