import Slider from '../Slider/Slider';
import Photo from './Photo';
import ReactTimeAgo from 'react-time-ago';

const PhotoSlider = ({ photos }) => {
    return (
        <Slider>
            {
                photos.map(photo =>
                    <div key={photo.id} className='flex flex-col'>
                        <Photo photo={photo} className='min-w-0 min-h-0 sm:w-56 h-56 lg:w-64 lg:h-64 xl:w-72' />
                        <div className='text-sm text-sky-950'>
                            <ReactTimeAgo date={new Date(photo.created_at)} />
                        </div>
                    </div>)
            }
        </Slider>
    );
};

export default PhotoSlider;