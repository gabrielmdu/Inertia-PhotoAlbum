import React from "react"
import ContentLayout from '@/Layouts/ContentLayout'

const ShowAlbum = ({ album }) => {
    return (
        <ContentLayout title={'Album ' + album.data.name}>
            {album.data.name}
        </ContentLayout>
    );
};

export default ShowAlbum;