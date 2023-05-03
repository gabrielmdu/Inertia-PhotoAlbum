import Glider from 'react-glider';
import { useCallback } from 'react';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';

import "glider-js/glider.min.css";
import "react-glider/glider.defaults.css";
import './Slider.scss';

const Slider = ({ children }) => {
    // adjust the number of slides according to how many were added
    const defineSlidesShown = useCallback(event => {
        const glider = event.detail.target._glider;

        const slidesCount = glider.slides.length;

        const options = [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: Math.min(slidesCount, 2),
                },
            },
            {
                breakpoint: 920,
                settings: {
                    slidesToShow: Math.min(slidesCount, 3),
                },
            },
        ];

        glider.setOption({ responsive: options });
    }, []);

    return (
        <Glider
            draggable
            hasArrows
            scrollLock
            iconLeft={<IconCircleArrowLeft size={28} />}
            iconRight={<IconCircleArrowRight size={28} />}
            slidesToShow={1}
            slidesToScroll={1}
            onLoad={defineSlidesShown}
        >
            {children}
        </Glider>
    );
};

export default Slider;