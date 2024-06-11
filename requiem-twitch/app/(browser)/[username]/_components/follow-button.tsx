"use client"
import { ApiUrls } from "@/app/path";
import { useForm } from "@/store/use-form";
import { revalidatePath } from "next/cache";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface FollowButtonProps{
    isFollowing:boolean,
    userid:number,
    setIsFollowing: Dispatch<SetStateAction<boolean>>
};

export const FollowButton = ({
    isFollowing,
    userid,
    setIsFollowing
}: FollowButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        onLoginForm
    } = useForm((state) => state);


    const FollowApi = async () => {
        setIsLoading(true);
        await fetch(ApiUrls.JAVA_APP_API_URL + "8080/follow/follow/" + userid + "?idfrom=" + localStorage.getItem("id"), {
            method: "POST",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json'},
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
            toast.success(json);
            setIsFollowing(!isFollowing);
        }).catch((err) => {
            console.log('Failed :' + err.message);
            toast.error('Something went wrong!');
            // toast.error('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
        });
    }


    if(localStorage.getItem('jwtToken') === null)
        return(<button 
            type="button" 
            onClick={onLoginForm} 
            className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"}
            >Follow1
            </button>) //Follow
    else{
        // return(<button 
        //     type="button" 
        //     onClick={FollowApi} 
        //     className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"}
        //     >Follow
        //     </button>)
        if(localStorage.getItem('id') === userid.toString())
            return(<></>)
        else if(isFollowing)
            return(<button 
                type="button" 
                onClick={FollowApi} 
                className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"}
                >Unfollow</button>) //Unfollow
        else if(!isFollowing)
            return(<button 
                type="button" 
                onClick={FollowApi} 
                className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"}
            >Follow</button>) //Follow
    }
} 