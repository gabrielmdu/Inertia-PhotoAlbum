import ContentHeader from '@/Components/ContentHeader';
import ContentLayout from '@/Layouts/ContentLayout';
import AlbumSlider from '@/Components/Album/AlbumSlider';
import { Link, usePage } from '@inertiajs/react';



export default function Dashboard({ albums, photos }) {
    const { auth: { user } } = usePage().props;

    return (
        <ContentLayout title="Dashboard">
            <ContentHeader>Dashboard - {user.name}</ContentHeader>

            <div className='mt-8 p-3 bg-gray-100 border border-purple-700 rounded'>
                <div className='mb-2'>Your latest album activity</div>

                <div className='px-8'>
                    <AlbumSlider albums={albums} />
                </div>

                <Link href={route('albums.index')} className='underline'>View all</Link>
            </div>

        </ContentLayout>
    );
}
