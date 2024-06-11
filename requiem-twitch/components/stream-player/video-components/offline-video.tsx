import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username: string;
};

export const OfflineVideo = ({
    username
}: OfflineVideoProps) => {
    return(
        <div className="h-full flex flex-col justify-center items-center">
            <WifiOff className="h-10 w-10"/>
            <p className=" text-white">
                {username} is offline
            </p>
        </div>
    );
}