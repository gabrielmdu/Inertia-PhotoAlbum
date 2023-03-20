import React, { useRef, useState } from "react";
import { useUpdateEffect } from "react-use";

/**
 * Component for text searching within a given time
 * 
 * @param {object} props
 * @param {(e:Event) => void} props.searchCallback - Callback that will be executed
 * @param {number} props.callbackTriggerTime - The timeout to execute the callback
 */
export default function SearchText({ text = '', searchCallback, callbackTriggerTime = 1000 }) {
    const [searchText, setSearchText] = useState(text);
    const callbackTimeout = useRef(0);

    useUpdateEffect(() => {
        clearTimeout(callbackTimeout.current);

        if (searchText.length === 0) {
            searchCallback(searchText);
        } else {
            callbackTimeout.current = setTimeout(() => searchCallback(searchText), callbackTriggerTime);
        }
    }, [searchText]);

    return (
        <div className='relative flex items-center mr-4 w-full max-w-sm'>
            <div className='flex w-full bg-white rounded shadow'>
                <input
                    className='relative px-6 py-2 w-full rounded focus:shadow-outline'
                    type="text"
                    placeholder="Search…"
                    autoComplete="false"
                    spellCheck="false"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <button
                className='absolute right-4 font-bold text-gray-400'
                onClick={() => setSearchText('')}
            >
                x
            </button>
        </div>
    );
}