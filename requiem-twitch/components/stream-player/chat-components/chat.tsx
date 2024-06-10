"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatInput, ChatInputSkelethon } from "./chat-input";
import { ChatMessages, ChatMessagesSkeleton } from "./chat-messages";
import { ChatCommunity } from "./chat-community";

interface ChatProps{
    hostName: string;
    hostIdentity: number;
    viewerName: string;
    isFollowing: boolean;
    stream: any;
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    stream
}: ChatProps) => {
    const [value, setValue] = useState("");
    const {variant, onExpand} = useChatSidebar((state) => state);
    const {chatMessages: messages, send} = useChat();

    const matches = useMediaQuery('(max-width: 1024px)');
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity.toString());
    
    
    useEffect(()=>{
        if(matches){
            onExpand();
        }
    },[matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if(!send) return;
        send(value);
        setValue("");
    }

    return(
        <div className="flex flex-col bg-slate-950 border-l border-[#2d2E35] border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader/>
            {variant === ChatVariant.CHAT ? (
                <>
                    <ChatMessages
                        messages={reversedMessages}
                        hostName={hostName}
                    />
                    <ChatInput
                        onSubmit={onSubmit}
                        value={value}
                        onChange={setValue}
                        stream={stream}
                        isFollowing={isFollowing}
                        isHost={hostName === viewerName}
                    />
                </>
            )
            :(
                <ChatCommunity
                    hostName={hostName}
                    viewerName={viewerName}
                />
            )}
        </div>
    );
};

export const ChatSkeleton = () => {
    return(
        <div className="flex flex-col-boreder-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            {/* <ChatHeaderSkeleton/> */}
            {/* <ChatMessagesSkeleton/>
            <ChatInputSkelethon/> */}
        </div>
    );
};