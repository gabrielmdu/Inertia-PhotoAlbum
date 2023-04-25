import Album from './Album';
import Glider from 'react-glider';

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
            breakpoint: 880,
            settings: {
                slidesToShow: 3,
            },
        },
    ];

    return (
        <Glider
            draggable
            hasArrows
            responsive={options}
            slidesToShow={1}
            slidesToScroll={1}
        >
            {
                albums.map(album =>
                    <div key={album.id} className='bg-transparent'>
                        <Album album={album} />
                    </div>)
            }
        </Glider>
    );
};

export default AlbumSlider;