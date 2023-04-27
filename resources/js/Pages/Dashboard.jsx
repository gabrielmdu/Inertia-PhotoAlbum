import ContentHeader from '@/Components/ContentHeader';
import ContentLayout from '@/Layouts/ContentLayout';
import Panel from '@/Components/Panel';
import AlbumSlider from '@/Components/Album/AlbumSlider';
import PhotoSlider from '@/Components/Photo/PhotoSlider';
import LinkButton from '@/Components/Button/LinkButton';
import { usePage } from '@inertiajs/react';
import { IconAlbum, IconPhoto } from '@tabler/icons-react';

export default function Dashboard({ albums, photos }) {
    const { auth: { user } } = usePage().props;

    return (
        <ContentLayout title="Dashboard">
            <ContentHeader>Dashboard - {user.name}</ContentHeader>

            <Panel>
                <Panel.Title className='flex align-center gap-1'>
                    <IconAlbum stroke={1.5} /> Your latest <span className='font-bold'>album</span> activity
                </Panel.Title>

                <div className='px-8'>
                    <AlbumSlider albums={albums} />
                </div>

                <LinkButton href={route('albums.index')} className='mb-3 ml-3 mt-2'>View all</LinkButton>
            </Panel>

            <Panel>
                <Panel.Title className='flex align-center gap-1 bg-lime-600 text-gray-50'>
                    <IconPhoto stroke={1.5} /> Your latest <span className='font-bold'>photo</span> activity
                </Panel.Title>

                <div className='px-8'>
                    <PhotoSlider photos={photos} />
                </div>
            </Panel>

        </ContentLayout>
    );
}
