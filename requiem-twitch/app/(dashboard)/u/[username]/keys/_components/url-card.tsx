import { CopyButton } from "./copy-button";

interface UrlCardProps {
    value: string| null;
};

export const UrlCard = ({
    value
}: UrlCardProps) => {
    return(
        <div className="rounded-xl bg-gray-800 border-neutral-600  border  p-6 mb-3">
            <div className="flex items-center">
                <p className="font-semibold text-neutral-100 shrink-0">
                    Server URL
                </p>
                <div className="w-full">
                    <div className="w-full flex items-center ">
                        <input 
                        className="bg-gray-800 border-neutral-500 border text-neutral-100 mx-4 text-sm rounded-lg block w-full p-2.5 "
                        value={value || ""}
                        disabled
                        placeholder="Server URL"
                        />
                        <CopyButton value={value || ""}/>
                    </div>
                </div>
            </div>
        </div>
    );
}