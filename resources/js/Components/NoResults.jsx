import React from "react";

const NoResults = ({ children }) =>
    <div className="rounded bg-purple-100 p-3 text-lg">
        {children || 'There are no results.'}
    </div>;

export default NoResults;