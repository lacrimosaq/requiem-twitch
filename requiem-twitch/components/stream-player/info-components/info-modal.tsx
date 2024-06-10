"use client";

import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface InfoModalProps{
    stream: any;
};

export const InfoModal = ({
    stream
}: InfoModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [streamName, setStreamName] = useState(stream.name);
    const [thumbnailUrl, setThumbnailUrl] = useState(stream.thumbnail);


    useEffect(() => {
        initFlowbite;
        // setStreamName(initialName);
        // setThumbnailUrl(initialThumbnailUrl);
        console.log("initialThumbnailUrl" + stream.thumbnail);
    }, []);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
            if(reader.result === null) return;
            const base64String = (reader.result as string).split(',')[1];
            setThumbnailUrl(base64String);
            console.log();
            };
            reader.readAsDataURL(file);
        }
        };
    const toggleModal = () => {
        if(isLoading) return;
        if(isModalOpen === true){
            setStreamName(stream.name);
            setThumbnailUrl(stream.thumbnail);
        }
        setIsModalOpen(!isModalOpen);
    };

    const ChangeData =  () => {
        if(streamName.length < 1) {
            toast.error('Failed :' + "No stream's name");
            return;
        }
        setIsLoading(true);
        let streamobj = {
            ["thumbnail"] : thumbnailUrl,
            ["name"] : streamName,
        };
        fetch("http://localhost:8080/stream/edit/" + localStorage.getItem("id"), {
            method: "PUT",
            headers: {"Authorization":"Bearer " + localStorage.getItem("jwtToken"), 'Content-Type': 'application/json'},
            body: JSON.stringify(streamobj)
            // headers: headers,
        }).then(resp => {
            if (!resp.ok) {
              return resp.text().then(text => { throw new Error(text); });
            }
            const contentType = resp.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              return resp.json();
            } else {
              return resp.text();
            }
        }).then(json => {
            // setStream(json);
            toast.success("Your data was successfully updated!");
        }).catch((err) => {
            toast.error('Failed :' + err.message);
            console.log('Failed :' + err.message);
        }).finally(() =>{
            setIsLoading(false);
            
        });

    }
    return(
        <div className="dark">
            <button
                onClick={toggleModal}
                className="block ml-auto text-white hover:underline bg-transparent  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
            >
                Edit
            </button>

            {isModalOpen && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                            <div className="relative transform overflow-hidden rounded-lg bg-white border-neutral-800 border dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white dark:bg-slate-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                
                                
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h1 className="text-base font-semibold leading-6 text-xl  text-white" id="modal-title">Edit stream info</h1>
                                        
                                        <form className="max-w-sm mx-auto mt-3">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input 
                                                disabled={isLoading}
                                                onChange={(e) => setStreamName(e.target.value)}
                                                value={streamName}
                                                placeholder="Stream name"
                                                className={cn("block w-full  p-2 text-gray-900 border focus:outline-none  border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-red-600 focus:border-red-600 dark:bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-600 dark:focus:border-red-600"
                                                )}
                                            />
                                        </form>
                                    </div>
                                </div>
                                <div className="px-3 pt-4">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
                                    {!thumbnailUrl ? (<div className="flex items-center justify-center w-full ">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG  (in Resolution 4:3)</p>
                                            </div>
                                            <input id="dropzone-file"  type="file" accept="image/jpeg, image/png" onChange={handleImageChange} className="hidden" />
                                        </label>
                                    </div> ):
                                    (<div className="relative aspect-video rounded-xl overflow-hidden border">
                                        <Image src={"data:image/jpeg;base64," + thumbnailUrl} alt="thumbnail" fill className="object-cover"/>
                                        <div className="absolute top-2 right-2">
                                            <button
                                            data-tooltip-target="tooltip-left-delete" data-tooltip-placement="right" 
                                            type="button" disabled={isLoading} onClick={() => {setThumbnailUrl(null);}} className="h-auto w-auto p-1.5 bg-white">
                                                <Trash className="h-4 w-4"/>
                                            </button>
                                            <div id="tooltip-left-delete" role="tooltip" 
                                                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                Delete
                                                <div className="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                                </div>


                                <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {!isLoading ? <button type="button" onClick={ChangeData} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                    Save
                                </button> :
                                 <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" disabled={isLoading}>
                                    Saving
                                </button>}
                                <button type="button" onClick={toggleModal} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}