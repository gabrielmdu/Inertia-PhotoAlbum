import React, { useState } from "react";
import ContentLayout from '@/Layouts/ContentLayout'
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import PickPhotosModal from "@/Components/Modal/PickPhotosModal";
import { getPicsumPhoto } from "@/common";
import ContentHeader from "@/Components/ContentHeader";
import Button from "@/Components/Button/Button";

export default function CreatePhoto({ album }) {
    const { data, setData, post, processing, errors } = useForm({
        album_id: album.data.id,
        caption: '',
        api_id: ''
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onHandlePictureClick = (id) => {
        setModalIsOpen(false);
        setData({ ...data, api_id: id });
    }

    const openPhotosModal = (e) => {
        e.preventDefault();
        setModalIsOpen(true);
    };

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('albums.photos.store', { album: album.data.id }));
    };

    return (
        <ContentLayout title={'Adding Photo to ' + album.data.name}>
            <ContentHeader>Adding Photo to {album.data.name}</ContentHeader>

            <PickPhotosModal
                show={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onPictureClick={onHandlePictureClick}
            />

            <form className="mt-10" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="caption" value="Caption" />

                    <TextArea
                        id="caption"
                        name="caption"
                        value={data.caption}
                        className="mt-1 block w-full max-w-xl"
                        rows={3}
                        maxLength={500}
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.caption} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="api_id" value="API Id - pick one or set the number directly" />

                    <TextInput
                        id="api_id"
                        name="api_id"
                        value={data.api_id}
                        className="mt-1 block w-full max-w-xl"
                        onChange={onHandleChange}
                        type='number'
                        min={1}
                        max={1000}
                        required
                    />

                    <InputError message={errors.api_id} className="mt-2" />
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-evenly sm:items-end mt-1 w-full max-w-xl p-3 border rounded border-gray-300 bg-gradient-to-t from-gray-100 to-indigo-50">
                    {data.api_id && <img src={getPicsumPhoto(data.api_id, 400, 300)} alt="Album cover" />}

                    <button
                        type="button"
                        className='flex items-center mt-2 sm:mt-0 px-4 py-2 bg-sky-600 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-sky-700 active:bg-sky-800 transition ease-in-out duration-150'
                        onClick={openPhotosModal}
                    >
                        Pick one
                    </button>
                </div>

                <Button type='submit' className="mt-4" disabled={processing}>
                    Add Photo
                </Button>
            </form>
        </ContentLayout>
    );
};