"use client";

import { useViewerToken } from "@/webhooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner";
import { Video, VideoSkeleton } from "./video-components/video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/utils/cn";
import { Chat, ChatSkeleton } from "./chat-components/chat";
import { ChatToggle } from "./chat-components/chat-toggle";
import { Header } from "./info-components/header";
import { InfoCard } from "./info-components/info-card";
import { ScrollArea } from "../ui/scroll-area";
import { AboutCard } from "./info-components/about-card";

interface StreamPlayerProps{
    user: any;
    stream: any;
    isFollowing: any;
    typePlayer: string;
}
export const StreamPlayer = ({
    user, //host
    stream,
    isFollowing,
    typePlayer
} : StreamPlayerProps) => {
    // const [isMaxHeight, setIsMaxHeight] = useState(false);
    // const divRef = useRef<HTMLDivElement>(null);
    // let maxHeight = 0; // 75vh in pixels
  
    // const checkHeight = () => {
    //   if (divRef.current && divRef.current.clientHeight) {
    //     const currentHeight = divRef.current.clientHeight;
    //     setIsMaxHeight(currentHeight >= maxHeight );
    //     console.log("isMaxHeight = " + isMaxHeight);
    //     console.log("currentHeight = " + currentHeight);
    //     console.log("maxHeight = " + maxHeight);
    //   }
    // };
  
    // useEffect(() => {
    //     maxHeight = (0.75 * window.innerHeight) - 0.5;
    //   window.addEventListener('resize', checkHeight);
    //   window.addEventListener('scroll', checkHeight);
    //   checkHeight(); // Initial check
  
    //   return () => {
    //     window.removeEventListener('resize', checkHeight);
    //     window.removeEventListener('scroll', checkHeight);
    //   };
    // }, []);

    const {
        token,
        name,
        identity
    } = useViewerToken(user.id);
    const {collapsed} = useChatSidebar((state) => state);

    // console.log("token = " + token);
    // console.log("name = " + name);
    // console.log("identity = " + identity);
    // const [token, setToken] = useState("");
    // const [name, setName] = useState("");
    // const [identity, setIdentity] = useState("");
    // useEffect(() => {
    //     const createToken = async () => {
    //         await fetch("http://localhost:9000/create-token/" + (localStorage.getItem("id") ?? 0) + "?viewerId="+ (localStorage.getItem("id") ?? 0), {
    //             method: "POST",
    //             // headers: headers,
    //         }).then(resp => {
    //             return resp.json()
    //         }).then(json => {
    //             setToken(json);
    //             const decodedToken = jwtDecode(json) as JwtPayload & {name?: string}
    //             const name = decodedToken?.name;
    //             const identity = decodedToken.jti;

    //             if(identity) setIdentity(identity);
    //             if(name) setName(name);
    //         }).catch((err) => {
    //             toast.error("Something went wrong")
    //         });
    //     }
    //     createToken();
    // }, []);
    if(!token || !name || !identity){ 
        return(
            <StreamPlayerSkeleton/>
        );
    }
    

    return (
        
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50"><ChatToggle/></div>
            )}
            <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
            className={cn("flex  h-screen overflow-hidden", 
                // collapsed && "lg:grid-cols-2" flex-col lg:flex-row
            )}
            >
                 <div className={cn("flex-1 relative bg-transparent lg:w-auto h-full overflow-y-scroll noscroll", )}> {/*lg:overflow-y-auto */}
                    <div className={cn("relative bg-black border-b lg:w-auto max-h-[75vh] ", )}>
                    <Video
                        hostIdentity={user.id}
                        hostName={user.username}
                    /></div>
                    <Header
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        avatar={user.avatar}
                        isFollowing={isFollowing}
                        streamName={stream.name}
                    />
                    {typePlayer === "edit" &&
                        <InfoCard
                        viewerIdentity={identity}
                        stream={stream}
                        hostName={user.username}
                    />}
                    {typePlayer === "watch" &&
                        <AboutCard
                            hostName={user.username}
                            hostInfo={user.info}
                            followersCount={user.followersCount}
                    />}

                    <p className="text-transparent mt-20">qwe</p>
                </div>
                <div className={cn("w-full lg:w-[340px] bg-gray-400 ", collapsed && "hidden")}>
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        chatDelay={stream.chatDelay}
                        isChatFollowersOnly={stream.followerChat}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
};

export const StreamPlayerSkeleton = () => {
    return(
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="flex-1 relative bg-transparent lg:w-auto max-h-[75vh]">
                <VideoSkeleton/>
            </div>
            <div className="w-full lg:w-[340px] bg-gray-400">
                <ChatSkeleton/>
            </div>
        </div>
    );
}