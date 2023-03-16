import React, { useState } from "react";

const TextArea = ({ className = '', showMaxLength = true, ...props }) => {
    const [textSize, setTextSize] = useState(props.value.length);

    const onHandleChange = e => {
        setTextSize(e.target.value.length);

        if (typeof props.onChange === 'function') {
            props.onChange(e);
        }
    };

    return (
        <div className={"relative " + className}>
            <textarea
                {...props}
                className={
                    "form-textarea block border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" +
                    className
                }
                onChange={onHandleChange}
            ></textarea>
            {showMaxLength &&
                <span className="absolute right-5 bottom-0 pointer-events-none text-gray-400">
                    {textSize}/{props.maxLength}
                </span>
            }
        </div>
    );
};

export default TextArea;