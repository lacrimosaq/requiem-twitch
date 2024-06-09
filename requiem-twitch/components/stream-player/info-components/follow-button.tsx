"use client";

import LoginForm from "@/app/(browser)/_components/AuthForm/LoginForm/LoginForm";
import { cn } from "@/lib/utils";
import { useForm } from "@/store/use-form";
import { Heart } from "lucide-react";
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
    const [isFollow, setIsFollow] = useState(isFollowing);
    const {
        onLoginForm
    } = useForm((state) => state);


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
        });
    }

    return(
        <button 
        onClick={localStorage.getItem('jwtToken') === null ? onLoginForm : FollowApi} 
        type="button"
        className="flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <Heart className={cn("h-4 w-4 mr-2 mt-0.5", isFollow ? "fill-white" : "fill-none")}/>
            <span>{isFollow ? "Unfollow" : "Follow"}</span>
        </button>
    );
}