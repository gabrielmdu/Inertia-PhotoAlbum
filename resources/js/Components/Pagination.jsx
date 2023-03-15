import React, { useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    IconChevronLeft,
    IconChevronsLeft,
    IconChevronRight,
    IconChevronsRight
} from '@tabler/icons-react';

/** Link to a paginated result set */
const PageLink = ({ href, isEnabled, isActive, preserveScroll, className = '', children }) => {
    const { filters = {} } = usePage().props;

    return (
        <Link
            preserveScroll={preserveScroll}
            href={href}
            data={filters}
            className={'flex items-center rounded mx-1 py-2 px-3 border border-rose-400 ' +
                (isEnabled ? ' opacity-50 pointer-events-none ' : '') +
                (isActive ? 'bg-rose-400 text-white pointer-events-none ' : 'hover:border-rose-300 hover:bg-rose-300 hover:text-white ') +
                className}
        >
            {children}
        </Link>
    );
};

export default function Pagination({ maxPages = 5, links, preserveScroll = false, className = '' }) {
    const {
        prevLink,
        nextLink,
        lastLink,
        lastPage,
        currentPage,
        allLinks,
    } = links;

    /** Return the array of available pages according to the current visited page */
    const getPages = useCallback(() => {
        const totalLinks = lastPage < maxPages
            ? lastPage
            : maxPages;
        const middleLink = Math.ceil(totalLinks / 2);

        const totalLeftRest = middleLink - 1;
        const totalRightRest = totalLinks - middleLink;
        let firstPageInArray = 1;

        if ((currentPage + totalRightRest) > lastPage) {
            firstPageInArray = lastPage - totalLinks + 1;
        } else {
            firstPageInArray = currentPage - totalLeftRest;
            firstPageInArray = firstPageInArray < 1 ? 1 : firstPageInArray;
        }

        return [...Array(totalLinks).keys()].map(i => i + firstPageInArray);
    }, [lastPage, currentPage, maxPages]);

    return (
        <div className={'flex flex-wrap justify-center w-full text-rose-500 ' + className}>
            <PageLink href={route(route().current())} isEnabled={currentPage === 1} preserveScroll={preserveScroll}><IconChevronsLeft size={16} /></PageLink>
            <PageLink href={prevLink} isEnabled={currentPage === 1} preserveScroll={preserveScroll}><IconChevronLeft size={16} /></PageLink>

            {getPages().map(page => {
                const { url, active } = allLinks[page];

                return (
                    <PageLink key={page} href={url} isActive={active} preserveScroll={preserveScroll}>
                        {page}
                    </PageLink>
                );
            })}

            <PageLink href={nextLink} isEnabled={currentPage === lastPage} preserveScroll={preserveScroll}><IconChevronRight size={16} /></PageLink>
            <PageLink href={lastLink} isEnabled={currentPage === lastPage} preserveScroll={preserveScroll}><IconChevronsRight size={16} /></PageLink>
        </div>
    );
};