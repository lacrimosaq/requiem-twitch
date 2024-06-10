"use client";
import { StreamPlayer } from "@/components/stream-player/stream-player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface StreamClientPageProps {
    params: {
        username: string;
    };
};

export const StreamClientPage = ({
    params,
} : StreamClientPageProps) => {
    const [profile, setProfile] = useState({id : undefined, username : ""});
    const [stream, setStream] = useState<any>({name: "", thumbnail: null, serverUrl: undefined, streamKey: undefined});
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        LoadHost(); //LoadStream inside
    }, [])
    
    
    const LoadHost = async () => {
        let status = 0;
        await fetch("http://localhost:8080/user/profile/" + params.username, {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            status = resp.status;
            return resp.json()
        }).then(json => {
            setProfile(json);
            if(localStorage.getItem("jwtToken") !== null )
            {
                // LoadIsFollow(json.id);
            }
        }).catch((err) => {
            // setNotFound(true);
            console.log('Failed :' + err.message);
        }).finally(() =>{
            // setIsLoading(false);
            LoadStream();
        });
    }
    // const LoadIsFollow = async (id) => {
    //     await fetch("http://localhost:8080/follow/isFollowing/" + id + `?idfrom=${localStorage.getItem("id")}`, {
    //         method: "GET",
    //         headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken")},
    //     }).then(resp => {
    //         if (!resp.ok) {
    //             return resp.text().then(text => { throw new Error(text); });
    //           }
    //           const contentType = resp.headers.get("content-type");
    //           if (contentType && contentType.includes("application/json")) {
    //             return resp.json();
    //           } else {
    //             return resp.text();
    //           }
    //     }).then(json => {
    //         console.log("Is? = " + json);
    //         setIsFollow(json);
    //     }).catch((err) => {
    //         // setNotFound(true);
    //         console.log('Failed :' + err.message);
    //     });
    // }
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
            setStream(json);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() =>{
            // setIsLoading(false);
            
        });
    }


    return(
        <div className="h-full">
            <StreamPlayer 
                user={profile}
                stream={stream}
                isFollowing={true} //can be here only as host
                typePlayer={"edit"}
            />
        </div>
    );
}
