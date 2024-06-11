"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps{
    participant : Participant;
}

export const LiveVideo = ({
    participant
}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [previousVolume, setPreviousVolume] = useState(0);

    useEffect(() => {
        onChangeVolume(0);
    }, []);

    const onToggleFullscreen = () => {
        if(isFullscreen){
            document.exitFullscreen();
        }
        else if(wrapperRef?.current){
            wrapperRef.current.requestFullscreen();
        }
    }

    const onChangeVolume = (value: number) => {
        console.log("previousVolume = " + previousVolume);
        console.log("volume = " + volume);
        console.log("value = " + value);
        if(volume !== 0) setPreviousVolume(volume)
        setVolume(+value);
        if(videoRef?.current){
            console.log("videoRef.current.volume = " + videoRef.current.volume);
            videoRef.current.muted = (value === 0); //TODO React bug with muted attribute
            videoRef.current.volume = (+value * 0.01);
            setIsMuted(value === 0);
            // if (value === 0) {
            //     videoRef.current.setAttribute('muted', '');
            // } else {
            //     videoRef.current.removeAttribute('muted');
            // }
        }
    };

    const onToggleVolume = () => {
        onChangeVolume(isMuted ? previousVolume : 0)
        // if(videoRef?.current){
        //     videoRef.current.muted = !isMuted;
        //     if(isMuted) {
        //         setVolume(+previousVolume);
        //         videoRef.current.volume = (+previousVolume * 0.01);
        //     }
        //     else {
        //         setVolume(0);
        //         videoRef.current.volume = (0);
        //     }
        // }
    };

    const handleFullScreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === participant.identity)
      .forEach((track) =>{
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
      });
    return(
        <div ref={wrapperRef} className="relative h-full flex">
            <video ref={videoRef} width={"100%"} />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 left-0 h-14  flex items-center justify-between  px-4">
                    <VolumeControl
                        value={volume}
                        onChange={onChangeVolume}
                        isMuted={isMuted}
                        onToggle={onToggleVolume}
                    />
                </div>
                <div className="absolute bottom-0 right-0 h-14  flex items-center justify-between  px-4">
                    <FullscreenControl
                    isFullscreen={isFullscreen}
                    onToggle={onToggleFullscreen}/>
                </div>
            </div>
        </div>
    );
}