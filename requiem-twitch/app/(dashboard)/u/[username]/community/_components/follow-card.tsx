import Image from "next/image";
import Link from "next/link";

interface FollowCardProps{
    username: string;
    avatar: string;
}

export const FollowCard = ({
    username,
    avatar
}: FollowCardProps) => {

    return(
        <div className="px-2">
            <div className="flex flex-col py-2 items-center justify-center bg-slate-800 border-2 border-slate-700  h-full gap-y-4 w-full">
                <Link href={"/" + username} className="inline-block"> 
                    <Image src={"data:image/jpeg;base64,"+avatar} width={80} height={80} alt="avatar" className="rounded-full mt-4 mx-4"/>
                </Link>
                <Link href={"/" + username} className="inline-block text-white text-md hover:underline mb-6"> 
                    {username}
                </Link>
            </div>
        </div>
    );
} 