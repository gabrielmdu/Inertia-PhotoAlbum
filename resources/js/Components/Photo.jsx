import { getPicsumPhoto } from '@/common';
import { IconCameraOff } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';

const Photo = ({ photo, onClick = () => { }, className = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleOnClick = event => {
        if (isLoading || hasError) {
            return;
        }

        onClick(event);
    };

    const handleOnImageError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    return (
        <div key={photo.id}
            className={
                'group flex justify-center items-center overflow-hidden min-w-full min-h-full bg-gradient-to-b from-gray-200 to-gray-400 '
                + (isLoading ? 'animate-pulse ' : '')
                + (!hasError && !isLoading ? 'cursor-pointer ' : '')
                + className
            }
            onClick={handleOnClick}
        >
            {
                !hasError
                    ? <img
                        onLoad={() => setIsLoading(false)}
                        onError={handleOnImageError}
                        src={getPicsumPhoto(photo.api_id, 300)}
                        alt="Photo"
                        className='group-hover:scale-125 transition-transform ease-in-out duration-300'
                    />
                    : <IconCameraOff
                        size={16}
                        stroke={1}
                        className='min-w-[50%] min-h-[50%] text-red-800'
                    />
            }
        </div>
    );
};

export default Photo;