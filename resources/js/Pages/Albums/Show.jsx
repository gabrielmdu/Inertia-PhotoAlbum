import React from "react"
import ContentLayout from '@/Layouts/ContentLayout'
import { IconEdit } from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

const ShowAlbum = ({ album }) => {
    return (
        <ContentLayout
            title={'Album ' + album.data.name}
            className='bg-gradient-to-b from-violet-900 via-purple-900 to-zinc-900'
        >
            <div className="flex border-b border-gray-500 pb-4">
                <div className="absolute right-6 top-6 text-white">
                    <Link href={route('albums.edit', { album: album.data.id })} title="Edit album">
                        <IconEdit size={28} stroke={1} />
                    </Link>
                </div>

                <div className="rounded-full overflow-hidden border-4 border-zinc-200 w-72">
                    <img src={`https://picsum.photos/id/${album.data.cover_id}/300`} alt="Album cover" />
                </div>

                <div className="flex flex-1 flex-col justify-center gap-4 px-4 py-3">
                    <div className="text-5xl font-mono text-lime-400">{album.data.name}</div>
                    <div className="text-xl italic text-gray-100">{album.data.description}</div>
                </div>
            </div>
        </ContentLayout>
    );
};

export default ShowAlbum;