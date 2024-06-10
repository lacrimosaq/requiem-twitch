"use client";
import { useEffect, useState } from "react";
import { FollowButton } from "@/components/stream-player/info-components/follow-button";
import Image from "next/image";
import Link from "next/link";

interface ResultUserCardProps{
    data: any,
}

export const ResultUserCard = ({
    data
}: ResultUserCardProps) => {
    const [isFollow, setIsFollow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("jwtToken") !== null && localStorage.getItem("id") !== data.id) {
            LoadIsFollow(data.id);
        }
    },[])
    const LoadIsFollow = async (id) => {
        setIsFollow(true);
        await fetch("http://localhost:8080/follow/isFollowing/" + id + `?idfrom=${localStorage.getItem("id")}`, {
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
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });
    };
    return(
        <div className="flex text-white my-3 w-full">
            <Link href={"/" + data.username}>
                <Image alt="User avatar" src={"data:image/jpeg;base64,"+ data.avatar} className={" my-2 mx-1 rounded-full"}  height={120} width={120}  /> 
            </Link>
            <div className="flex flex-col px-12 w-full">
                <div className="flex flex-col md:flex-row  ">
                    <div>
                        <Link href={"/" + data.username} className="font-semibold text-lg hover:text-red-600">
                            {data.username}
                        </Link>
                        <p className="text-sm">
                            {(data.followersCount >= 1000 ? (data.followersCount / 1000).toFixed(1) + 'k': data.followersCount) + " "}
                            followers
                        </p>
                        <p className="text-sm lg:mt-5 my-2">
                            {data.info ?? "No info."}
                        </p>
                    </div>
                    <div className="md:ml-auto">
                    <FollowButton
                        hostIdentity={data.id}
                        isFollowing={isFollow}
                    />
                    </div>
                    
                </div>
            </div>
        </div>
    );
    
    
}