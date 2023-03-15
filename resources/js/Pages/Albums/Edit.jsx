import React from "react";
import ContentLayout from '@/Layouts/ContentLayout'

export default function EditAlbum(props) {
    return (
        <ContentLayout title='Album'>
            Album {props.album.data.id}
        </ContentLayout>
    );
};