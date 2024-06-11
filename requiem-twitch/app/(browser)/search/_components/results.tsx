"use client";
import { useEffect, useState } from "react";
import { ResultUserCard } from "./result-user-card";
import { ResultStreamCard } from "./result-stream-card";
import { ApiUrls } from "@/app/path";

interface ResultsProps{
    term?: string;
};

export const Results = ({
    term
}: ResultsProps) => {
    const [users, setUsers] = useState<any| null>([]);
    const [streams, setStreams] = useState<any| null>([]);
    const [isLoading, setIsloading] = useState<any| null>(false);

    useEffect(() => {
        setIsloading(true);
        Promise.all([LoadUsersByTerm(), LoadStreamsByTerm()])
        .then(([result1, result2]) => {
        })
        .catch(error => {
            console.error(error);
        }).finally(() => {
            setIsloading(false);
        });
    },[term])

    const LoadUsersByTerm = () => {
        fetch(ApiUrls.JAVA_APP_API_URL + "/user/search?term=" + term, {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            setUsers(json);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        });
    }
    const LoadStreamsByTerm = () => {
        fetch(ApiUrls.JAVA_APP_API_URL + "/stream/search?term=" + term, {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            setStreams(json);
        }).catch((err) => {
            console.log('Failed :' + err.message);
        });
    }
    return(
        <div>
            {users.length > 0 && (
            <div>
                <h2 className="text-lg text-white font-semibold mb-4">
                    Channels 
                </h2>
                <hr className="border-gray-800 mb-3"/>
                {users.map((user) =>(
                // <p className='text-white'>{stream.name}</p>
                <ResultUserCard
                    key={user.id}
                    data={user}
                />
                ))}
            </div>
            )}
            {streams.length > 0 && (
            <div>
                {users.length < 0 && <hr className="border-gray-800 mb-3"/>}
                <h2 className="text-lg text-white font-semibold mb-4">
                    Streams 
                </h2>
                {users.length > 0 && <hr className="border-gray-800 mb-3"/>}
                {streams.map((stream) =>(
                // <p className='text-white'>{stream.name}</p>
                <ResultStreamCard
                    key={stream.id}
                    data={stream}
                />
                ))}
            </div>
            )}
            {streams.length}
        </div>
    );
}