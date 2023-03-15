import Album from '@/Components/Album';
import ContentLayout from '@/Layouts/ContentLayout';
import Pagination from '@/Components/Pagination';
import { getLinksFromLaravelPagination } from '@/common';

export default function AlbumsIndex({ albums }) {
    return (
        <ContentLayout title='Albums'>
            <div className='p-3 text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-gray-100 font-mono'>My Albums</div>

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