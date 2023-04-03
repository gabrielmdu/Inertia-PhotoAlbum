import { getPicsumPhoto } from '@/common';
import { IconCameraOff } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';

const Photo = ({ photo }) => {
    const ref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div key={photo.id}
            className={'flex justify-center items-center min-w-full min-h-full bg-gradient-to-b from-gray-200 to-gray-400 '
                + (isLoading ? 'animate-pulse' : '')}
            ref={ref}
        >
            {
                !hasError
                    ? <img
                        onLoad={() => setIsLoading(false)}
                        onError={() => { setHasError(true); setIsLoading(false) }}
                        src={getPicsumPhoto(photo.api_id, 300)}
                        alt="Photo"
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