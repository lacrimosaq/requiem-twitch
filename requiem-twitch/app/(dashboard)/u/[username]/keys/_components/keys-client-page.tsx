"use client";

import { useEffect, useState } from "react";
import { UrlCard } from "./url-card";
import { cn } from "@/utils/cn";
import { KeyCard } from "./key-card";
import { ConnectModal } from "./connect-modal";
import { ApiUrls } from "@/app/path";

export const KeysClientPage = () => {
    const [streamData, setStreamData] = useState<any>({serverUrl: undefined, streamKey: undefined});
    const [isLoading, setIsLoading] = useState<boolean| null>(true);

    useEffect(() => {
        LoadStream()
    }, []);
    
    const LoadStream = async () => {
        let status = 0;
        await fetch(ApiUrls.JAVA_APP_API_URL + "/stream/user/" + localStorage.getItem("id"), {
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
                <h1 className="text-2xl text-neutral-100 font-bold">
                    Keys & URLs
                </h1>

                <ConnectModal stream={streamData} setStream={setStreamData}/>

            </div>
            <div>
                <UrlCard value={streamData.serverUrl}/>
                <KeyCard value={streamData.streamKey }/>
            </div>
        </div>
    );
};
