"use client";

import LoginForm from "@/app/(browser)/_components/AuthForm/LoginForm/LoginForm";
import { cn } from "@/lib/utils";
import { useFollowing } from "@/store/use-following-users";
import { useForm } from "@/store/use-form";
import { Heart, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FollowButtonProps{
    hostIdentity:number;
    isFollowing:boolean;
};

export const FollowButton = ({
    hostIdentity,
    isFollowing
}: FollowButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFollow, setIsFollow] = useState(false);
    const {UpdateFollowing} = useFollowing((state) => state);
    if((+(localStorage.getItem("id") ?? 0)) === hostIdentity) return;
    const {
        onLoginForm
    } = useForm((state) => state);

    
    useEffect(() => {
        setIsFollow(isFollowing);
    },[isFollowing])

    const FollowApi = async () => {
        setIsLoading(true);
        await fetch("http://localhost:8080/follow/follow/" + hostIdentity + "?idfrom=" + localStorage.getItem("id"), {
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
            setIsFollow(!isFollow);
        }).catch((err) => {
            console.log('Failed :' + err.message);
            toast.error('Something went wrong!');
            // toast.error('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            UpdateFollowing();
        });
    }

    return(
        <button 
        onClick={localStorage.getItem('jwtToken') === null ? onLoginForm : FollowApi} 
        type="button"
        className={cn("flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
            isFollow && "text-red-700 bg-white hover:bg-gray-200 "
        )}>
            {isLoading ? 
            (<><Loader className="h-4 w-4 mr-2 mt-0.5 animate-spin" />
            <span>Loading</span></>) 
            : 
            (<><Heart className={cn("h-4 w-4 mr-2 mt-0.5", isFollow ? "fill-red-600" : "fill-none")}/>
            <span>{isFollow ? "Unfollow" : "Follow"}</span></>)}
        </button>
    );
}