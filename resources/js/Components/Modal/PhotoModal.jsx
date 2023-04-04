import { getPicsumPhoto } from "@/common";
import React from "react";
import Modal from "./Modal";

const PhotoModal = ({ photo, ...props }) => {
    return (
        <Modal maxWidth="xl" {...props}>
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <img src={getPicsumPhoto(photo.api_id, 600, 700)} alt="Photo" />
                </div>
                <div className="p-2">
                    {photo.caption}
                </div>
            </div>
        </Modal>
    );
};

export default PhotoModal;