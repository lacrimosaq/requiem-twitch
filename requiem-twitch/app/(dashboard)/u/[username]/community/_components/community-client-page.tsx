"use client";

import { useEffect, useState } from "react";
import { FollowCard } from "./follow-card";


export const CommunityClientPage = () => {
    const [following, setFollowing] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        LoadFollowing();
      }, []);

    const LoadFollowing = () => {
        setIsLoading(true);
        fetch("http://localhost:8080/follow/following/" + (localStorage.getItem("id") === null ? 0 : localStorage.getItem("id")), {
            method: "GET",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken")},
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            setFollowing(json);
            console.log(json.length);
            json.map((stream) => {console.log(stream.name)});
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }
    return(
        (!isLoading && <div className="px-24 pt-6">
            {following.length === 0 && (
                <div className='text-whtie text-s,'>No following found.</div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {following.map((user) =>(
                    <FollowCard
                        key={user.id}
                        username={user.username}
                        avatar={user.avatar}
                    />
                ))}
            </div>
        </div>
        ));
}