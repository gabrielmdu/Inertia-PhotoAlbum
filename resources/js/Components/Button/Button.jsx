import { BUTTON_TYPE } from "@/common";
import React from "react";

const Button = ({ ComponentType = 'button', colorType = BUTTON_TYPE.NEUTRAL, disabled, className = '', children, ...props }) => {
    const color = {
        [BUTTON_TYPE.SUCCESS]: 'bg-green-600',
        [BUTTON_TYPE.ERROR]: 'bg-red-600',
        [BUTTON_TYPE.WARNING]: 'bg-yellow-600',
        [BUTTON_TYPE.INFO]: 'bg-sky-600',
        [BUTTON_TYPE.NEUTRAL]: 'bg-gray-600',
    }[colorType];

    return (
        <ComponentType
            type='button'
            {...props}
            className={
                `rounded px-5 py-2 ${color} text-gray-100 drop-shadow-md text-sm ${disabled && 'opacity-25'} `
                + className
            }
            disabled={disabled}
        >
            {children}
        </ComponentType>
    );
};

export default Button;