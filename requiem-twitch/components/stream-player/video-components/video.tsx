"use client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: number;
};

export const Video = ({
    hostName,
    hostIdentity
} : VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity.toString());
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity.toString());

    let content;
    console.log("participant = " + participant);
    console.log("tracks = " + tracks);
    console.log("connectionState = " + connectionState);
    if(!participant && connectionState === ConnectionState.Connected){
        content = <OfflineVideo username={hostName}/>
    } else if(!participant || tracks.length === 0){
        content = <LoadingVideo label={connectionState.toString()}/>
    } else {
        content = <LiveVideo participant={participant}/>
    }

    return(
        <div className="aspect-video border-b group text-white bg-black relative max-h-[75vh] mx-auto">
            {content}
        </div>
    );
};

export const VideoSkeleton = () => {
    return(
        <div className="aspect-video border-x border-background">
            <Skeleton className="h-full w-full rounded-none"/>
        </div>
    );
}