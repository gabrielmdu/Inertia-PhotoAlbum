import { Link } from "@inertiajs/react";
import React from "react";

const CreateButton = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            as='button'
            className={
                'bg-orange-400 px-4 py-2 text-gray-100 whitespace-nowrap drop-shadow-md rounded '
                + className
            }
        >
            {children || 'Create'}
        </Link>
    );
};

export default CreateButton;