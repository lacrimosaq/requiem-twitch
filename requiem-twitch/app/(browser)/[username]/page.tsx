"use client"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { FollowButton } from "./_components/follow-button";

interface UserPageProps{
    params: {
        username: string;
    };
};

const UserPage = ({
    params
}: UserPageProps) => {
    const [profile, setProfile] = useState({id : 0, username : ""});
    const [isFollow, setIsFollow] = useState(false);
    const [notFound, setNotFound] = useState<boolean| null>(null);
    const [isLoading, setIsLoading] = useState<boolean| null>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const promises = [LoadProfile()];
                await Promise.all(promises);

                // if (localStorage.getItem("jwtToken") !== null) {
                //     promises.push(tmp());
                // }
                // await Promise.all(promises);

                // LoadProfile();
                // if(localStorage.getItem("jwtToken") !== null)
                // {
                //     LoadIsFollow();
                // }
                // setNotFound(false);
            } 
            finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);
    
    const LoadProfile = async () => {
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
                LoadIsFollow(json.id);
            }
        }).catch((err) => {
            setNotFound(true);
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });
    }
    const tmp = async (id) => {console.log(id);}
    
    const LoadIsFollow = async (id) => {
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
            setNotFound(true);
            console.log('Failed :' + err.message);
        });
    }


    return(
        <div>
            {!isLoading &&(
                notFound === true 
                ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-xl">Sorry. Unless you've got a time machine, that content is unavailable.</p>
                    </div>
                )
                : (
                    <div>
                        <p>User: {profile.username}</p>
                        <p>is follow: {`${isFollow}`}</p>
                        <FollowButton userid={profile.id} isFollowing={isFollow} setIsFollowing={setIsFollow}/>
                    </div>
                )
            )}            
        </div>
    );
}
export default UserPage;