"use client";

import { useViewerToken } from "@/webhooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { Video } from "./video";

interface StreamPlayerProps{
    user: any;
    stream: any;
    isFollowing: any;
}
export const StreamPlayer = ({
    user,
    stream,
    isFollowing
} : StreamPlayerProps) => {

    const {
        token,
        name,
        identity
    } = useViewerToken(user.id);

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
    if(!token || !name || !identity){ //TODO IDENTITY EMPTY
        return(
            <div className="text-white">
                Cannot watch stream
            </div>
        );
    }
    

    return (
        
        <>
            <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
            className="grid grid-cols-1 lg:grid-cols-3 2xl: grid-cols-6 h-full"
            >
                 <div className="col-span-6 lg:col-span-2  hidden-scrollbar pb-10"> {/*lg:overflow-y-auto */}
                    <Video
                        hostIdentity={user.id}
                        hostName={user.username}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}