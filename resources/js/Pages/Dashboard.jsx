import ContentHeader from '@/Components/ContentHeader';
import ContentLayout from '@/Layouts/ContentLayout';
import AlbumSlider from '@/Components/Album/AlbumSlider';
import { Link, usePage } from '@inertiajs/react';



export default function Dashboard({ albums, photos }) {
    const { auth: { user } } = usePage().props;

    return (
        <ContentLayout title="Dashboard">
            <ContentHeader>Dashboard - {user.name}</ContentHeader>

            <div className='mt-8 p-3 bg-gradient-to-t from-neutral-100 to-slate-200 border border-purple-700 rounded'>
                <div className='p-2 text-gray-200 bg-sky-600 rounded-t'>Your latest album activity</div>

                <div className='px-8 bg-gradient-to-r from-gray-100 to-neutral-200'>
                    <AlbumSlider albums={albums} />
                </div>

                <Link href={route('albums.index')} className='py-2 px-4 rounded bg-orange-400 text-white'>
                    View all
                </Link>
            </div>

        </ContentLayout>
    );
}
