import Glider from 'react-glider';
import { useEffect, useRef } from 'react';
import { IconCircleArrowLeft, IconCircleArrowRight } from '@tabler/icons-react';

import "glider-js/glider.min.css";
import "react-glider/glider.defaults.css";
import './Slider.scss';

const Slider = ({ children }) => {
    const gliderRef = useRef(null);

    // adjust the number of slides according to how many were added
    useEffect(() => {
        const slidesCount = gliderRef.current.slides.length;

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

        gliderRef.current.setOption({ responsive: options });
    }, [gliderRef]);

    return (
        <Glider
            draggable
            hasArrows
            scrollLock
            iconLeft={<IconCircleArrowLeft size={28} />}
            iconRight={<IconCircleArrowRight size={28} />}
            slidesToShow={1}
            slidesToScroll={1}
            ref={gliderRef}
        >
            {children}
        </Glider>
    );
};

export default Slider;