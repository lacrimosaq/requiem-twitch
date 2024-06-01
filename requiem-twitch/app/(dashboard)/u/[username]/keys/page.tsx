"use client";

import { useEffect, useState } from "react";
import { UrlCard } from "./_components/url-card";
import { cn } from "@/utils/cn";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = () => {
    const [streamData, setStreamData] = useState<any>({serverUrl: undefined, streamKey: undefined});
    const [isLoading, setIsLoading] = useState<boolean| null>(true);

    useEffect(() => {
        LoadStream()
    }, []);
    
    const LoadStream = async () => {
        let status = 0;
        await fetch("http://localhost:8080/stream/user/" + localStorage.getItem("id"), {
            method: "GET",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken")},
            // headers: headers,
        }).then(resp => {
            status = resp.status;
            return resp.json()
        }).then(json => {
            setStreamData(json);
            console.log('followerChat :' + json.followerChat);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });
    }
    return(
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>

                <ConnectModal/>

            </div>
            <div>
                <UrlCard value={streamData.serverUrl}/>
                <KeyCard value={streamData.streamKey }/>
            </div>
        </div>
    );
};

export default KeysPage;