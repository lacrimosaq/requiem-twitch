"use client"

import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";
import { ThumbsUp } from "lucide-react";

// interface RecommendedProps {
//     data: Object[]
// };

export const Recommended = ({data}) => {
    const {
        collapsed
    } = useSidebar((state) => state);

    return(
        <div>{data.length > 0 &&(!collapsed ?(
            <div className="pl-2 mb-3 mt-5">
                <p className="text-sm text-white">Recommended</p>
            </div>
        ): (
            <div className="flex justify-center my-3">
            <ThumbsUp className="w-5 h-5 text-white text-center"/> </div>  
        ))}      
        <ul>
            {data.map((user) =>(
                <UserItem 
                    key={user.id} 
                    username={user.username}
                    avatar={user.avatar}
                    isLive={user.live}
                    viewersCount={user.viewersCount}
                />
            ))}
        </ul>
        </div>
    );
}