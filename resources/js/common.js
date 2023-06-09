// ----- constants

export const BUTTON_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    NEUTRAL: 'neutral'
};

export const PICSUM_URL = 'https://picsum.photos/id/';

// ----- functions

/**
 * 
 * @param {int} id The photo id
 * @param {int} width 
 * @param {int|null} height 
 * @returns URL to Picsum photo
 */
export const getPicsumPhoto = (id, width, height) => {
    height = height ?? width;
    return `${PICSUM_URL}${id}/${width}/${height}`;
};

/**
 * 
 * @param {*} links 
 * @param {*} meta 
 * @returns 
 */
export const getLinksFromLaravelPagination = (links, meta) => {
    return {
        firstLink: links.first,
        prevLink: links.prev,
        nextLink: links.next,
        lastLink: links.last,
        lastPage: meta.last_page,
        currentPage: meta.current_page,
        allLinks: meta.links,
    };
};

/**
 * Remove empty properties from an object.
 * Example: the object `{ prop1: 1, prop2: null } turns to { prop1: 1 }`
 * 
 * @param {object} obj The object to be cleaned
 * @returns 
 */
export const getCleanObject = obj => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''));