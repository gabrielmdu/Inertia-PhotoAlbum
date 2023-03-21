import { IconCircleCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const FlashMessage = ({ className = '', type = 'success', children }) => {
    const [opacity, setOpacity] = useState(100);

    useEffect(() => {
        setTimeout(() => setOpacity(0), 5000);
    }, []);

    return (
        <div
            className={
                "fixed z-50 right-0 sm:right-10 bottom-8 bg-gradient-to-r text-white text-xl p-8 max-w-md w-full drop-shadow-md transition-opacity duration-1000 ease-out "
                + 'opacity-' + opacity + ' '
                + (type === 'success' && ' from-green-500 to-lime-500 ')
                + className
            }
        >
            <div className="absolute right-4 top-4">
                {type === 'success' && <IconCircleCheck size={26} />}
            </div>
            {children}
        </div>
    );
};

export default FlashMessage;