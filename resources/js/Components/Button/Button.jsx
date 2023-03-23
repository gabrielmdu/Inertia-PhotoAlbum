import { BUTTON_TYPE } from "@/common";
import React from "react";

const Button = ({ colorType, className = '', children, ...props }) => {
    const color = {
        [BUTTON_TYPE.SUCCESS]: 'bg-green-600',
        [BUTTON_TYPE.ERROR]: 'bg-red-600',
        [BUTTON_TYPE.WARNING]: 'bg-yellow-600',
        [BUTTON_TYPE.INFO]: 'bg-sky-600',
    }[colorType];

    return (
        <button
            {...props}
            type='button'
            className={
                `rounded px-5 py-2 ${color} text-gray-100 drop-shadow-md text-sm `
                + className
            }
        >
            {children}
        </button>
    );
};

export default Button;