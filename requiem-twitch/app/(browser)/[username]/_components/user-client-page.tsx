"use client"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { FollowButton } from "./follow-button";
import { Stream } from "stream";
import { StreamPlayer } from "@/components/stream-player/stream-player";
import { NotFound } from "./not-found";
import { ApiUrls } from "@/app/path";

interface UserClientPageProps{
    params: {
        username: string;
    };
};
export const UserClientPage = ({
    params
}: UserClientPageProps) => {
    const [profile, setProfile] = useState({id : 0, username : ""});
    const [isFollow, setIsFollow] = useState(false);
    const [stream, setStream] = useState<any>({name: "", thumbnail: null, serverUrl: undefined, streamKey: undefined});
    const [notFound, setNotFound] = useState<boolean| null>(null);
    const [isLoading, setIsLoading] = useState<boolean| null>(true);

    useEffect(() => {
        const loadData  = async () => {
            LoadProfile()
            .then(profileId => {
                LoadStream(profileId);
                if (localStorage.getItem("jwtToken") !== null && profileId) {
                    if(localStorage.getItem("username") === params.username) setIsFollow(true)
                    else return LoadIsFollow(profileId)
                }
            })
            .catch(err => {
                console.log('Failed to load data:', err.message);
                setNotFound(true);
            })
            .finally(() => {
                setIsLoading(false);
                console.log("Finally loadData");
            });
        };
        loadData();
    }, []);
    
    const LoadProfile = () => {
        return fetch(ApiUrls.JAVA_APP_API_URL + "/user/profile/" + params.username, {
            method: "GET",
            // headers: headers,
        })
        .then(resp => {
            if (!resp.ok) {
                return Promise.reject(new Error('Failed to fetch profile'));
            }
            return resp.json();
        })
        .then(json => {
            setProfile(json);
            return json.id; // Return profile ID for further use
        })
        .catch(err => {
            setNotFound(true);
            console.log('Failed to load profile:', err.message);
            return Promise.reject(err);
        });
    };
    const LoadIsFollow = async (id) => {
        await fetch(ApiUrls.JAVA_APP_API_URL + "/follow/isFollowing/" + id + `?idfrom=${localStorage.getItem("id")}`, {
            method: "GET",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken")},
        }).then(resp => {
            if (!resp.ok) {
                return resp.text().then(text => { throw new Error(text); });
              }
              const contentType = resp.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                return resp.json();
              } else {
                return resp.text();
              }
        }).then(json => {
            console.log("Is? = " + json);
            setIsFollow(json);
        }).catch((err) => {
            setNotFound(true);
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            console.log("Finally LoadIsFollow");
            
        });
    };
    const LoadStream = async (id) => {
        let status = 0;
        await fetch(ApiUrls.JAVA_APP_API_URL + "/stream/user/" + id, {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            status = resp.status;
            return resp.json()
        }).then(json => {
            setStream(json);
            console.log("Finally LoadStream");
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() =>{
            // setIsLoading(false);
            
        });
    };


    return(
        <div>
            {!isLoading &&(
                notFound === true 
                ? (
                    <NotFound/>
                )
                : (
                    <StreamPlayer
                        user={profile}
                        stream={stream}
                        isFollowing={isFollow} //can be here only as host
                        typePlayer={"watch"}

                    />
                )
            )}            
        </div>
    );

}