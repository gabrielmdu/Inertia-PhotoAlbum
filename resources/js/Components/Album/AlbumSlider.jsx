import Album from './Album';
import Glider from 'react-glider';
import ReactTimeAgo from 'react-time-ago';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';

import "glider-js/glider.min.css";
import "react-glider/glider.defaults.css";
import './AlbumSlider.scss';

const AlbumSlider = ({ albums }) => {
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
                albums.map(album =>
                    <div key={album.id} className='flex flex-col'>
                        <Album album={album} sizeClasses='w-5/6 sm:w-56 h-56 lg:w-64 lg:h-64 xl:w-72' />
                        <div className='text-sm text-sky-950'>
                            <ReactTimeAgo date={new Date(album.updated_at)} />
                        </div>
                    </div>)
            }
        </Glider>
    );
};

export default AlbumSlider;