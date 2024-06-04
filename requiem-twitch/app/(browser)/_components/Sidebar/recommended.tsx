"use client"

import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";

// interface RecommendedProps {
//     data: Object[]
// };

export const Recommended = ({data}) => {
    const {
        collapsed
    } = useSidebar((state) => state);

    return(
        <div>{!collapsed && data.length > 0 &&(
            <div className="pl-2 mb-3 mt-5">
                <p className="text-sm text-white">Recommended</p>
            </div>
        )}       
        <ul>
            {data.map((user) =>(
                <UserItem 
                    key={user.id} 
                    username={user.username}
                    avatar={user.avatar}
                    isLive={user.live}
                />
            ))}
        </ul>
        </div>
    );
}