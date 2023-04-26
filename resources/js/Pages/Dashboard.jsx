import ContentHeader from '@/Components/ContentHeader';
import ContentLayout from '@/Layouts/ContentLayout';
import AlbumSlider from '@/Components/Album/AlbumSlider';
import PhotoSlider from '@/Components/PhotoSlider';
import { Link, usePage } from '@inertiajs/react';

export default function Dashboard({ albums, photos }) {
    const { auth: { user } } = usePage().props;

    return (
        <ContentLayout title="Dashboard">
            <ContentHeader>Dashboard - {user.name}</ContentHeader>

            <div className='mt-8 bg-slate-200 rounded drop-shadow-lg'>
                <div className='p-2 text-gray-200 bg-violet-800 rounded-t'>Your latest album activity</div>

                <div className='px-8'>
                    <AlbumSlider albums={albums} />
                </div>

                <div className='pb-4 pl-4'>
                    <Link href={route('albums.index')} className='py-2 px-3 rounded bg-cyan-400 text-white'>
                        View all
                    </Link>
                </div>
            </div>

            <div className='mt-8 bg-slate-200 rounded drop-shadow-lg'>
                <div className='p-2 text-gray-200 bg-violet-800 rounded-t'>Your latest photo activity</div>

                <div className='px-8'>
                    <PhotoSlider photos={photos} />
                </div>
            </div>

        </ContentLayout>
    );
}
