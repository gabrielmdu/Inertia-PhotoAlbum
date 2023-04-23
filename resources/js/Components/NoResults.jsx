import React from "react";

const NoResults = ({ children, className = '' }) =>
    <div className={`rounded bg-purple-100 p-3 text-lg ${className}`}>
        {children || 'There are no results.'}
    </div>;

export default NoResults;