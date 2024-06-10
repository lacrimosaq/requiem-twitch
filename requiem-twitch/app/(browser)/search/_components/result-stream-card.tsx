"use client";
import { useEffect, useState } from "react";
import { FollowButton } from "@/components/stream-player/info-components/follow-button";
import Image from "next/image";
import Link from "next/link";
import { Thumbnail } from "@/components/thumbnail";

interface ResultStreamCardProps{
    data: any,
}

export const ResultStreamCard = ({
    data
}: ResultStreamCardProps) => {
    return(
        <Link href={`/${data.user.username}`}>
        <div className="flex text-white my-3 w-full h-[120px]">
            <Thumbnail
                src={data.thumbnail}
                fallback={data.user.avatar}
                isLive={data.isLive}
                viewersCount={data.viewersCount}
            />
            <div className="flex items-start ms-2">
                <div className="flex flex-col text-sm overflow-hidden text-white my-2 mx-1">
                    <p className="font-semibold hover:text-red-600">
                        {data.name}
                    </p>
                    <p className="text-neutral-400">
                        {data.user.username}
                    </p>
                </div>
            </div>
        </div>
        </Link>
    );
}