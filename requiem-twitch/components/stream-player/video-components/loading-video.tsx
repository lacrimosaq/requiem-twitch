import { Loader } from "lucide-react";

interface LoadingVideoProps {
    label: string;
};

export const LoadingVideo = ({
    label
}: LoadingVideoProps) => {
    return(
        <div className="h-full flex flex-col justify-center items-center">
            <Loader className="h-10 w-10 animate-spin" />
            <p className=" text-white capitalize">
                {label} 
            </p>
        </div>
    );
}