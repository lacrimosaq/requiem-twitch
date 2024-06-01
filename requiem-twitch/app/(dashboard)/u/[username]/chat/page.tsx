"use client";

import { useEffect, useState } from "react";
import { ToggleCard } from "./_components/toggle-card";

const ChatdPage = () => {
    // const [stream, setStream] = useState({followerChat: false});
    const [followerChat, setfollowerChat] = useState( false);
    const [chatDelay, setChatDelay] = useState(0);
    // const [isFollow, setIsFollow] = useState(false);
    // const [notFound, setNotFound] = useState<boolean| null>(null);
    const [isLoading, setIsLoading] = useState<boolean| null>(true);

    useEffect(() => {
        LoadStream()
        // const loadData = async () => {
        //     try {
        //         const promises = [LoadProfile()];
        //         await Promise.all(promises);
        //     } 
        //     finally {
        //         setIsLoading(false);
        //     }
        // }
        // loadData();
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
            setfollowerChat(json.followerChat);
            setChatDelay(json.chatDelay);
            console.log('followerChat :' + json.followerChat);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });
    }


    return(
        <>{!isLoading &&(
        <div className="p-6">
            
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Chat Settings
                </h1>
            </div>
            <div className="space-y-4">
            <ToggleCard 
                field="followerChat"
                label="Enable follow chat"
                valueBoolean={followerChat}
                valueNumber={undefined}
            />
            </div>
            <div className="space-y-4">
            <ToggleCard 
                field="chatDelay"
                label="Enter char delay duration(ms)"
                valueBoolean={undefined}
                valueNumber={chatDelay}
            />
            </div>
        </div>)}</>
    );
}

export default ChatdPage;