import { getPicsumPhoto } from "@/common";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Album({ album }) {
    const maxDescriptionChars = 100;
    const descriptionShort = album.description.length <= maxDescriptionChars
        ? album.description
        : (album.description.slice(0, maxDescriptionChars) + '...');
    const bgUrl = getPicsumPhoto(album.cover_id, 300);

    return (
        <Link
            href={route('albums.show', { album: album.id })}
            className="group relative w-full drop-shadow-md sm:w-58 h-52 lg:w-72 lg:h-72 xl:w-80 rounded-t-md border border-gray-500 border-b-4 border-b-gray-600"
        >
            <div className="transition duration-150 ease-out absolute w-full h-full bg-no-repeat bg-center bg-cover opacity-50 group-hover:opacity-70 blur-[2px] group-hover:blur-none" style={{ backgroundImage: `url(${bgUrl})` }}></div>
            <div className="absolute px-4 py-3">
                <div className="drop-shadow-md font-mono text-xl text-gray-200 bg-purple-600 border border-purple-600 py-1 px-2">{album.name}</div>
                <div className="bg-opacity-70 group-hover:bg-opacity-90 rounded-b-lg bg-white mt-2 text-gray-800 font-bold p-1">{descriptionShort}</div>
            </div>
        </Link>
    );
};