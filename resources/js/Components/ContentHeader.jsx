import React from "react";

const ContentHeader = ({ children }) => {
    return (
        <div className='text-center sm:text-left text-3xl rounded text-violet-800 bg-violet-600 overflow-hidden'>
            <div className='inline-block bg-lime-300 skew-x-35 sm:-ml-12 my-1'>
                <div className='-skew-x-35 pl-8 sm:pl-14 pr-8 sm:pr-6 py-2'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ContentHeader;