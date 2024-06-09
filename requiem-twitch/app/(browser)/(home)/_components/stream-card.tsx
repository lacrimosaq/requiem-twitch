import { Thumbnail } from "@/components/thumbnail";
import Link from "next/link";

interface StreamCardProps {
    data: any;
}

export const StreamCard = ({
    data,
}: StreamCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
        <div className="h-full w-full">
            <Thumbnail
                src={data.thumbnail}
                fallback={data.user.avatar}
                isLive={data.isLive}
                username={data.user.username}
            />
        </div>
        </Link>
    );
}