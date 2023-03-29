import { getPicsumPhoto } from "@/common";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";

const PhotosModal = ({ onPictureClick, scrollTolerance = 100, ...props }) => {
    const maxPicId = 1000;
    const picsPerScroll = 6;
    const firstPictures = Array.from({ length: picsPerScroll }, (_, i) => i + 1);

    const [pictures, setPictures] = useState(firstPictures);
    const [canAddPhotos, setCanAddPhotos] = useState(true);

    useEffect(() => {
        if (!canAddPhotos) {
            setTimeout(() => setCanAddPhotos(true), 300);
        }
    }, [canAddPhotos]);

    const photosDiv = useCallback(scrollDiv => {
        if (scrollDiv !== null) {
            scrollDiv.dispatchEvent(new Event('scroll'));
        }
    }, []);

    const onHandleScroll = e => {
        const bottom = (e.target.scrollHeight - e.target.scrollTop) <= (e.target.clientHeight + scrollTolerance);
        if (bottom && canAddPhotos) {
            addPictures();
            setCanAddPhotos(false);
        }
    };

    const addPictures = () => {
        const lastPicId = pictures.slice(-1)[0];
        if (lastPicId < maxPicId - picsPerScroll) {
            const newIds = Array.from({ length: picsPerScroll }, (_, i) => i + 1 + lastPicId);
            setPictures([...pictures, ...newIds]);
        }
    };

    return (
        <Modal {...props} afterLeave={() => setPictures(firstPictures)}>
            <div className="flex flex-col px-3 py-4 h-[32rem]">
                <div className="mb-2 px-2 py-2 rounded bg-lime-500 text-gray-700 shadow-inner">
                    Select a picture
                </div>

                <div
                    id="scroll-pictures"
                    className="flex-1 border border-blue-100 overflow-y-auto grid grid-cols-3 gap-2"
                    onScroll={onHandleScroll}
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