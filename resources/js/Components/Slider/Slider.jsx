import Glider from 'react-glider';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';

import "glider-js/glider.min.css";
import "react-glider/glider.defaults.css";
import './Slider.scss';

const Slider = ({ children }) => {
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
            {children}
        </Glider>
    );
};

export default Slider;