import { getPicsumPhoto } from "@/common";
import React, { useState } from "react";
import Modal from "./Modal";
import ReactTimeAgo from "react-time-ago";

const PhotoModal = ({ photo, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Modal maxWidth="xl" {...props}>
            <div className="flex flex-col items-center">
                <div className={"relative w-full h-0 pb-[114.3%] bg-gradient-to-b from-gray-200 to-gray-400 " + (isLoading ? 'animate-pulse' : '')}>
                    <img className="absolute block w-full h-full" onLoad={() => setIsLoading(false)} src={getPicsumPhoto(photo.api_id, 600, 700)} alt="Photo" />
                </div>
                <div className="w-full p-2 bg-stone-900">
                    <div className="w-full pr-2 text-gray-400 text-sm">
                        <ReactTimeAgo date={new Date(photo.created_at)} />
                    </div>
                    <div className="mt-1 text-gray-100">
                        {photo.caption}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PhotoModal;