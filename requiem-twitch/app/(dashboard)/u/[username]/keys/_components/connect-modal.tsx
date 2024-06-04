"use client";

import { cn } from "@/utils/cn";
import { Dispatch, useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { IngressInput } from "livekit-server-sdk";
import { toast } from "sonner";

interface ConnectModalProps {
    stream: any;
    setStream: Dispatch<any>;
};

export const ConnectModal = () => {
    const RTMP = String(IngressInput.RTMP_INPUT);
    const WHIP = String(IngressInput.WHIP_INPUT);
    type IngressType = typeof RTMP | typeof WHIP;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const [isLoading, startLoading] = useState(false);


    useEffect(() => {
        initFlowbite;
    }, []);

    const toggleModal = () => {
        if(isLoading) return;
        setIsModalOpen(!isModalOpen);
    };

    const GenerateIngress = () => {
        console.log(ingressType);
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // fetch("http://localhost:9000/create-ingress/" + localStorage.getItem("id") + "?ingressType=" + ingressType, {
        //       method: "POST",
        //       headers: headers,
        //   }).then(resp => {
        //       if (!resp.ok) {
        //         return resp.text().then(text => { throw new Error(text); });
        //       }
        //       const contentType = resp.headers.get("content-type");
        //       if (contentType && contentType.includes("application/json")) {
        //         return resp.json();
        //       } else {
        //         return resp.text();
        //       }
        //   }).then(json => {
        //     toast.error('Generation successful!');
        //     console.log("Token from login" + json);
        //     //   if(status == 200) window.location.reload(); 
        //   }).catch((err) => {
        //       console.log('Failed :' + err.message);
        //       toast.error('Something went wrong!');
        //     //   setError('Failed :' + err.message);
        //   }).finally(() =>{
        //     startLoading(false);
        //   });
    }

    return (
        <div className="dark">
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Generate connection
            </button>

            {isModalOpen && (
                <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-gray-700 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-white-600 dark:text-white-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h2 className="text-base font-semibold leading-6 text-white-900" id="modal-title">Generate connection</h2>
                                    
                                    <form className="max-w-sm mx-auto">
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingress Type</label>
                                    <select id="countries" 
                                        value={ingressType}
                                        onChange={(event) => setIngressType(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
                                    >
                                        {/* <option selected>Ingress Type</option> */}
                                        <option value={RTMP}>RTMP</option>
                                        <option value={WHIP}>WHIP</option>
                                    </select>
                                    </form>

                                    <div className="mt-2">
                                        <p className="text-sm text-white-500">Are you sure you want to generate new connection? This action will generate new connection.</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {!isLoading ? <button type="button" onClick={GenerateIngress} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                                    Generate
                                </button> :
                                 <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">
                                    Generating
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
};
