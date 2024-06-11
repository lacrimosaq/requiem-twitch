import { Thumbnail } from "@/components/thumbnail";
import { Avatar } from "flowbite-react";
import { UserIcon } from "lucide-react";
import Link from "next/link";

interface StreamCardProps {
    data: any;
}

export const StreamCard = ({
    data,
}: StreamCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
        <div className="h-full w-full px-2">
            <Thumbnail
                src={data.thumbnail}
                fallback={data.user.avatar}
                isLive={data.live}
                viewersCount={data.viewersCount}
            />
            <div className="flex items-start">
                <Avatar alt="User avatar" img={"data:image/jpeg;base64,"+data.user.avatar} className={" w-10 my-2 mx-1"} rounded />  
                <div className="flex flex-col text-sm overflow-hidden text-white my-2 mx-1">
                    <p className="font-semibold hover:text-red-600">
                        {data.name}
                    </p>
                    <p className="text-neutral-400">
                        {data.user.username}
                    </p>
                </div>
            </div>
        </div>
        </Link>
    );
}