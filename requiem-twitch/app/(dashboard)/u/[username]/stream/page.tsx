"use client";
import { StreamPlayer } from "@/components/stream-player/stream-player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface StreamPageProps {
    params: {
        username: string;
    };
};

const StreamPage = ({
    params,
} : StreamPageProps) => {
    const [profile, setProfile] = useState({id : undefined, username : ""});
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        LoadHost();
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


    return(
        <div className="h-full">
            <StreamPlayer 
                user={profile}
                stream={null}
                isFollowing={true} //can be here only as host
            />
        </div>
    );
}

export default StreamPage;