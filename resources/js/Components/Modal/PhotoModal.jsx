import { getPicsumPhoto } from "@/common";
import React, { useState } from "react";
import Modal from "./Modal";

const PhotoModal = ({ photo, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Modal maxWidth="xl" {...props}>
            <div className="flex flex-col items-center">
                <div className={"relative w-full h-0 pb-[114.3%] bg-gradient-to-b from-gray-200 to-gray-400 " + (isLoading ? 'animate-pulse' : '')}>
                    <img className="absolute block w-full h-full" onLoad={() => setIsLoading(false)} src={getPicsumPhoto(photo.api_id, 600, 700)} alt="Photo" />
                </div>
                <div className="p-2">
                    {photo.caption}
                </div>
            </div>
        </Modal>
    );
};

export default PhotoModal;