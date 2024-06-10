"use client"
import { useState, useRef, useEffect } from 'react';
import { StreamCard } from './stream-card';

export const StreamsFeed = () => {
    const [recommended, setRecommended] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        LoadRecommended();
      }, []);
    
    
        const LoadRecommended = () => {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        fetch("http://localhost:8080/stream/recommended/" + (localStorage.getItem("id") === null ? 0 : localStorage.getItem("id")), {
            method: "GET",
            // headers: headers,
        }).then(resp => {
            if (resp.status !== 200) {
                throw new Error('User not found');
            }
            return resp.json()
        }).then(json => {
            setRecommended(json);
            console.log(json.length);
            json.map((stream) => {console.log(stream.name)});
        }).catch((err) => {
            console.log('Failed :' + err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }
    // const transformedNames = ;
    return(
    (!isLoading && <div>
        <h2 className="text-lg text-white font-semibold mb-4">
        Live channels we think you&apos;ll like
        </h2>
        {recommended.length === 0 && (
            <div className='text-whtie text-s,'>No stream found.</div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {recommended.map((stream) =>(
                // <p className='text-white'>{stream.name}</p>
                <StreamCard
                    key={stream.id}
                    data={stream}
                />
            ))}
        </div>
    </div>));
}