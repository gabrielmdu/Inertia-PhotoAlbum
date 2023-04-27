import Slider from '../Slider/Slider';
import Album from './Album';
import ReactTimeAgo from 'react-time-ago';

const AlbumSlider = ({ albums }) => {
    return (
        <Slider>
            {
                albums.map(album =>
                    <div key={album.id} className='flex flex-col'>
                        <Album album={album} sizeClasses='w-5/6 sm:w-56 h-56 lg:w-64 lg:h-64 xl:w-72' />
                        <div className='text-sm text-sky-950'>
                            <ReactTimeAgo date={new Date(album.updated_at)} />
                        </div>
                    </div>)
            }
        </Slider>
    );
};

export default AlbumSlider;