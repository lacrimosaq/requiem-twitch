import { CopyButton } from "./copy-button";

interface UrlCardProps {
    value: string| null;
};

export const UrlCard = ({
    value
}: UrlCardProps) => {
    return(
        <div className="rounded-xl bg-slate-600 p-6 mb-3">
            <div className="flex items-center">
                <p className="font-semibold shrink-0">
                    Server URL
                </p>
                <div className="w-full">
                    <div className="w-full flex items-center ">
                        <input 
                        className="bg-slate-800  mx-4 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
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