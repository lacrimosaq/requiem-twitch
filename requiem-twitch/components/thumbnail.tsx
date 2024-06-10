import Image from "next/image";

interface ThumbnailProps {
    src: string|null;
    fallback: string;
    isLive: boolean;
    viewersCount: number;
};

export const Thumbnail = ({
    src,
    fallback,
    isLive,
    viewersCount
}: ThumbnailProps) => {
    return(
        <div className="group aspect-video relative rounded-md cursor-pointer ">
            <div className="rounded-md absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"/>
                {!src ? (
                    <div className="bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center h-full gap-y-4 w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
                        <Image src={"data:image/jpeg;base64,"+fallback} width={100} height={100} alt="avatar" className="rounded-full"/>
                    </div>
                ) : (
                <div>
                    <Image src={"data:image/jpeg;base64," + src} fill alt="thumbnail"
                    className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"/>
                </div>)}
                {isLive && (<div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <div className="bg-red-600 rounded-sm px-1 text-white text-sm font-semibold">LIVE</div>
                </div>)}

                {isLive ?(
                    <div className="absolute bottom-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <div className="bg-black rounded-sm px-1 text-white text-sm opacity-70">
                            <p className="text-white-opacity-100">{(viewersCount >= 1000 ? (viewersCount / 1000).toFixed(1) + 'k': viewersCount) + " "} viewers</p>
                        </div>
                    </div>) :
                    (<div className="absolute bottom-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <div className="bg-black rounded-sm px-1 text-white text-sm opacity-70">
                            <p className="text-white-opacity-100">Offline</p>
                        </div>
                    </div>)}
                
        </div>
    );
};