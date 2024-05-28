"use client"

import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";

// interface RecommendedProps {
//     data: Object[]
// };

export const Following = ({data}) => {
    const {
        collapsed
    } = useSidebar((state) => state);

    return(
        <div>{!collapsed && data.length > 0 &&(
            <div className="pl-2 mb-3">
                <p className="text-sm text-white">Following</p>
            </div>
        )}       
        <ul>
            {data.map((user) =>(
                <UserItem 
                    key={user.id} 
                    username={user.username}
                    avatar={user.avatar}
                    isLive={true}
                />
            ))}
        </ul>
        </div>
    );
}