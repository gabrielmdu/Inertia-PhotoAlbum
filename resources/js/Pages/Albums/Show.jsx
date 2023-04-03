import React, { useCallback, useEffect, useRef, useState } from "react"
import ContentLayout from '@/Layouts/ContentLayout'
import { IconEdit, IconLoader2 } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { getPicsumPhoto } from "@/common";
import ReactTimeAgo from "react-time-ago";
import { usePaginatedResults } from "@/Hooks/usePaginatedResults";

const ShowAlbum = ({ album }) => {
    const refObserved = useRef();
    const refObserver = useRef();

    const [photos, setPhotos] = useState([]);

    const url = route('api.photos.index', { album_id: album.data.id });
    const { setCurrPage, isLoading } = usePaginatedResults(url, handleOnResult);

    useEffect(() => {
        refObserver.current = new IntersectionObserver(handleObserved);
    }, [refObserved]);

    useEffect(() => {
        refObserver.current.observe(refObserved.current);

        return () => {
            refObserver.current.disconnect();
        };
    }, [refObserved]);

    function handleOnResult(data) {
        console.log('photos loaded');
        setPhotos([...photos, ...data.data]);
        console.log(data);
        if (data.links.next) {
            refObserver.current.observe(refObserved.current);
        }
    }

    const handleObserved = useCallback((entries) => {
        entries.forEach(
            e => {
                if (e.isIntersecting) {
                    refObserver.current.unobserve(e.target);
                    setCurrPage(prevPage => prevPage + 1);
                }
            }
        );
    }, []);

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
            <div className="grid grid-cols-4 gap-2 mt-6 lazy">
                {photos.map(photo =>
                    <div key={photo.id} className='min-w-full min-h-full bg-lime-300'>
                        <img src={getPicsumPhoto(photo.api_id, 300)} alt="" />
                    </div>)
                }
            </div>

            {isLoading &&
                <div className="flex items-center justify-center p-4 w-full text-white animate-spin">
                    <IconLoader2 size={28} />
                </div>
            }

            <div ref={refObserved} className=""></div>
        </ContentLayout>
    );
};

export default ShowAlbum;