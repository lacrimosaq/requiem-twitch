"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-form";
import { ChatMessages } from "./chat-messages";

interface ChatProps{
    hostName: string;
    hostIdentity: number;
    viewerName: string;
    isFollowing: boolean;
    chatDelay: number;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    chatDelay,
    isChatFollowersOnly
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
        <div className="flex flex-col bg-slate-700 border-l border-b pt-0 h-[calc(100vh-80px)]">
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
                        isChatFollowersOnly={isChatFollowersOnly}
                        chatDelay={chatDelay}
                        isFollowing={isFollowing}
                        isHost={hostName === viewerName}
                    />
                </>
            )
            :(
                <>
                    <p>Community mode</p>
                </>
            )}
        </div>
    );
}