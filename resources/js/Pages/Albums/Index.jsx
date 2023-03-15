import Album from '@/Components/Album';
import ContentLayout from '@/Layouts/ContentLayout';
import Pagination from '@/Components/Pagination';
import { getCleanObject, getLinksFromLaravelPagination } from '@/common';
import SearchText from '@/Components/SearchText';
import { router, usePage } from '@inertiajs/react';

export default function AlbumsIndex({ albums }) {
    const { filters } = usePage().props;

    function searchCallback(searchText) {
        router.get(route(route().current()), {
            ...getCleanObject({ search: searchText }),
        }, { preserveState: true })
    };

    return (
        <ContentLayout title='Albums'>
            <div className='p-3 text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-gray-100 font-mono'>My Albums</div>

            <div className='flex items-center justify-between my-6'>
                <SearchText text={filters.search || ''} searchCallback={searchCallback} callbackTriggerTime={250} />
            </div>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
                {
                    albums.data.length === 0
                        ? <div>There are no albums here :(</div>
                        : albums.data.map(a => <Album key={a.id} album={a} />)
                }
            </div>

            {albums.data.length > 0 && <Pagination links={getLinksFromLaravelPagination(albums.links, albums.meta)} preserveScroll />}
        </ContentLayout>
    );
}