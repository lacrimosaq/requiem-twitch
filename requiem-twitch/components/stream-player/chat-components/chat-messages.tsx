"use client";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

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
                <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
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
}
