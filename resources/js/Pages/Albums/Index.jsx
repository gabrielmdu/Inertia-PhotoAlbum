import Album from '@/Components/Album';
import ContentLayout from '@/Layouts/ContentLayout';
import Pagination from '@/Components/Pagination';
import { getCleanObject, getLinksFromLaravelPagination } from '@/common';
import SearchText from '@/Components/SearchText';
import { router, usePage } from '@inertiajs/react';
import NoResults from '@/Components/NoResults';
import { IconAlbum, IconAlbumOff } from '@tabler/icons-react';
import CreateButton from '@/Components/CreateButton';
import ContentHeader from '@/Components/ContentHeader';

export default function AlbumsIndex({ albums }) {
    const { filters } = usePage().props;

    function searchCallback(searchText) {
        router.get(route(route().current()), {
            ...getCleanObject({ search: searchText }),
        }, { preserveState: true })
    };

    return (
        <ContentLayout title='Albums'>
            <ContentHeader>My Albums</ContentHeader>

            <div className='flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3 my-6'>
                <SearchText className="max-w-full sm:max-w-sm" text={filters.search || ''} searchCallback={searchCallback} callbackTriggerTime={250} />
                <CreateButton className='flex items-center gap-1' href={route('albums.create')}><IconAlbum size={22} /> Create Album</CreateButton>
            </div>

            {
                albums.data.length === 0
                    ? <NoResults>There are no albums here <IconAlbumOff className='inline' /></NoResults>
                    : <div className='mt-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
                        {albums.data.map(a => <Album key={a.id} album={a} />)}
                    </div>
            }

            {albums.data.length > 0
                && <div className='w-full absolute bottom-4 left-0'>
                    <Pagination links={getLinksFromLaravelPagination(albums.links, albums.meta)} preserveScroll />
                </div>
            }
        </ContentLayout>
    );
}