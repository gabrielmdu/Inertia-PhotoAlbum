import React from "react"
import ContentLayout from '@/Layouts/ContentLayout'
import { IconEdit } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { getPicsumPhoto } from "@/common";
import ReactTimeAgo from "react-time-ago";

const ShowAlbum = ({ album }) => {
    return (
        <ContentLayout
            title={'Album ' + album.data.name}
            className='bg-gradient-to-b from-violet-900 via-purple-900 to-zinc-900'
        >
            <div className="relative flex flex-col sm:flex-row border-b border-gray-500 pb-4">
                <div className="absolute right-6 top-6 text-white">
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
        </ContentLayout>
    );
};

export default ShowAlbum;