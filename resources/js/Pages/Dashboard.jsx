import ContentHeader from '@/Components/ContentHeader';
import ContentLayout from '@/Layouts/ContentLayout';
import Panel from '@/Components/Panel';
import AlbumSlider from '@/Components/Album/AlbumSlider';
import PhotoSlider from '@/Components/Photo/PhotoSlider';
import LinkButton from '@/Components/Button/LinkButton';
import { Link, usePage } from '@inertiajs/react';
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
                    {
                        albums.length > 0
                            ? <>
                                <AlbumSlider albums={albums} />
                                <LinkButton href={route('albums.index')} className='mb-3 ml-3 mt-2'>View all</LinkButton>
                            </>
                            : <div className='py-4'>
                                <p>
                                    You don't have any albums.
                                </p>
                                <Link className='underline text-lime-600' href={route('albums.create')}>Start by adding a new one here</Link>.
                            </div>
                    }
                </div>

            </Panel>

            <Panel>
                <Panel.Title className='flex align-center gap-1 !bg-lime-600 text-gray-50'>
                    <IconPhoto stroke={1.5} /> Your latest <span className='font-bold'>photo</span> activity
                </Panel.Title>

                <div className='px-8'>
                    {
                        photos.length > 0
                            ? <PhotoSlider photos={photos} />
                            : <div className='py-4'>
                                <p>
                                    You don't have any photos.
                                </p>
                                <p>
                                    You can <Link className='underline text-lime-600' href={route('albums.index')}>
                                        access your albums to add photos
                                    </Link> or <Link className='underline text-lime-600' href={route('albums.create')}>
                                        create a new one
                                    </Link>.
                                </p>
                            </div>
                    }
                </div>
            </Panel>

        </ContentLayout>
    );
}
