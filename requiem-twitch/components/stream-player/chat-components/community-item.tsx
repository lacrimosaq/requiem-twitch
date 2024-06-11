import { cn } from "@/lib/utils";

interface CommunityItemProps{
    hostName: string;
    viewerName: string;
    participantName: string|undefined;
    participantIdentity: string;
};

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity
}: CommunityItemProps) => {

    return(
        <div className={cn("group flex items-center justify-between w-full py-3 px-4 rounded-md text-sm ")}> 
            <p className="text-white hover:underline">
                {participantName}
            </p>
        </div>
    );
}