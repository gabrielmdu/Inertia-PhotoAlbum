import { getPicsumPhoto } from "@/common";
import React, { useCallback, useEffect, useRef } from "react";
import Modal from "./Modal";

const PhotosModal = ({ pictures, onPictureClick, onPicturesScroll, ...props }) => {
    const photosDiv = useCallback(scrollDiv => {
        if (scrollDiv !== null) {
            scrollDiv.dispatchEvent(new Event('scroll'));
        }
    }, []);


    return (
        <Modal {...props}>
            <div className="flex flex-col px-3 py-4 h-[32rem]">
                <div className="mb-2 px-2 py-2 rounded bg-lime-500 text-gray-700 shadow-inner">
                    Select a picture
                </div>

                <div
                    id="scroll-pictures"
                    className="flex-1 border border-blue-100 overflow-y-auto grid grid-cols-3 gap-2"
                    onScroll={onPicturesScroll}
                    ref={photosDiv}
                >
                    {pictures.map(picId =>
                        <div key={picId} className='relative group cursor-pointer' onClick={() => onPictureClick(picId)}>
                            <img className="group-hover:opacity-60 transition ease-in-out duration-100" src={getPicsumPhoto(picId, 200)}></img>
                            <div className="absolute opacity-0 group-hover:opacity-100 rounded bg-orange-400 text-gray-200 px-4 py-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{picId}</div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default PhotosModal;