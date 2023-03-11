import React from "react";
import ContentLayout from '@/Layouts/ContentLayout'

export default function EditAlbum(props) {
    return (
        <ContentLayout
            auth={props.auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Album</h2>}
            title='Album'
        >
            Album {props.album.data.id}
        </ContentLayout>
    );
};