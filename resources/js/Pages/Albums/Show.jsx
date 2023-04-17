import React, { useEffect, useRef, useState } from "react"
import ContentLayout from '@/Layouts/ContentLayout'
import { IconCamera, IconEdit, IconLoader2, IconPhoto } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { getPicsumPhoto } from "@/common";
import ReactTimeAgo from "react-time-ago";
import { usePaginatedResults } from "@/Hooks/usePaginatedResults";
import { useObserved } from "@/Hooks/useObserved";
import Photo from "@/Components/Photo";
import PhotoModal from "@/Components/Modal/PhotoModal";
import axios from "axios";
import LinkButton from "@/Components/Button/LinkButton";

const ShowAlbum = ({ album }) => {
    const refObserved = useRef();

    const [photos, setPhotos] = useState([]);

    const url = route('api.albums.photos.index', { album: album.data.id });
    const { setCurrPage, isLoading } = usePaginatedResults(url, handleOnResult);

    const { isObserved, startObserving, stopObserving } = useObserved(refObserved);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currPhoto, setCurrPhoto] = useState(null);

    useEffect(() => {
        if (isObserved) {
            stopObserving();
            setCurrPage(prevPage => prevPage + 1);
        }
    }, [isObserved]);

    function handleOnResult(data) {
        setPhotos([...photos, ...data.data]);

        if (data.links.next) {
            startObserving();
        }
    }

    const handleCloseModal = async () => {
        const response = await axios.get(route('api.photos.show', { photo: currPhoto.id }));

        const newPhotos = photos.map(p => p.id === currPhoto.id ? response.data.data : p);

        setPhotos(newPhotos);
        setIsModalOpen(false);
        setCurrPhoto(null);
    };

    return (
        <ContentLayout
            title={'Album ' + album.data.name}
            className='bg-gradient-to-b from-violet-900 via-purple-900 to-zinc-900'
        >
            <div className="relative flex flex-col sm:flex-row border-b border-gray-500 pb-4">
                <div className="absolute right-0 top-0 text-white">
                    <Link href={route('albums.edit', { album: album.data.id })} title="Edit album">
                        <IconEdit size={28} stroke={1} />
                    </Link>
                </div>

                <div className="flex justify-center w-full sm:w-72 h-60 sm:h-72">
                    <div className="rounded-full overflow-hidden border-4 border-zinc-200 w-60 sm:w-full h-full">
                        <img src={getPicsumPhoto(album.data.cover_id, 300)} alt="Album cover" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-4 px-4 py-3">
                    <div className="text-3xl sm:text-5xl font-mono text-lime-400">{album.data.name}</div>
                    <div className="text-md sm:text-xl italic text-gray-100">{album.data.description}</div>
                </div>

                <div className="absolute right-0 bottom-0 text-gray-400 text-xs">
                    Created <ReactTimeAgo date={album.data.created_at} />
                    {album.data.updated_at !== album.data.created_at &&
                        <span> (Updated <ReactTimeAgo date={album.data.updated_at} />) </span>}
                </div>
            </div>

            <div className="flex items-center justify-between w-full mt-2">
                <div className="flex items-center gap-1 text-gray-200">
                    <IconPhoto stroke={1} size={20} /> {album.data.photos_count}
                </div>
                <LinkButton className='flex items-end gap-1' href={route('albums.photos.create', { album: album.data.id })}>
                    <IconCamera stroke={1} /> Add Photo
                </LinkButton>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-6 lazy">
                {photos.map(photo =>
                    <Photo key={photo.id} photo={photo} onClick={() => { setIsModalOpen(true); setCurrPhoto(photo); }} />)
                }
            </div>

            <div ref={refObserved} className="">
                {isLoading &&
                    <div className="flex items-center justify-center p-4 w-full text-white animate-spin">
                        <IconLoader2 size={28} />
                    </div>
                }
            </div>
            {currPhoto &&
                <PhotoModal photo={currPhoto} show={isModalOpen} onClose={handleCloseModal} />
            }
        </ContentLayout>
    );
};

export default ShowAlbum;