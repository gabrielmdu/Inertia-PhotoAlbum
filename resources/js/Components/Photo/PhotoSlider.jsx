import Photo from './Photo';
import Glider from 'react-glider';
import ReactTimeAgo from 'react-time-ago';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';

import "glider-js/glider.min.css";
import "react-glider/glider.defaults.css";
import '../Album/AlbumSlider.scss';

const PhotoSlider = ({ photos }) => {
    const options = [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 3,
            },
        },
    ];

    return (
        <Glider
            draggable
            hasArrows
            scrollLock
            iconLeft={<IconCircleArrowLeft size={28} />}
            iconRight={<IconCircleArrowRight size={28} />}
            responsive={options}
            slidesToShow={1}
            slidesToScroll={1}
        >
            {
                photos.map(photo =>
                    <div key={photo.id} className='flex flex-col'>
                        <Photo photo={photo} className='min-w-0 min-h-0 sm:w-56 h-56 lg:w-64 lg:h-64 xl:w-72' />
                        <div className='text-sm text-sky-950'>
                            <ReactTimeAgo date={new Date(photo.created_at)} />
                        </div>
                    </div>)
            }
        </Glider>
    );
};

export default PhotoSlider;