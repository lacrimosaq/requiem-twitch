import Image from "next/image";

interface ThumbnailProps {
    src: string|null;
    fallback: string;
    isLive: boolean;
    username: string;
};

export const Thumbnail = ({
    src,
    fallback,
    isLive,
    username
}: ThumbnailProps) => {
    return(
        <div className="group aspect-video relative rounded-md cursor-pointer ">
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"/>
                {!src ? (
                    <div className="bg-slate-600 flex flex-col items-center justify-center h-full gap-y-4 w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
                        <Image src={fallback} width={100} height={100} alt="avatar"/>
                    </div>
                ) : (
                <div>
                    <Image src={"data:image/jpeg;base64," + src} fill alt="thumbnail"
                    className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"/>
                </div>)}
        </div>
    );
};