import React, { useState } from "react";
import ContentLayout from '@/Layouts/ContentLayout'
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import PhotosModal from "@/Components/PhotosModal";
import ConfirmModal from "@/Components/ConfirmModal";
import Button from "@/Components/Button/Button";
import { BUTTON_TYPE, getPicsumPhoto } from "@/common";
import { IconClick } from "@tabler/icons-react";

export default function EditAlbum({ album }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: album.data.name,
        description: album.data.description,
        cover_id: album.data.cover_id
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const maxPicId = 1000;
    const picsPerScroll = 12;
    const firstPictures = Array.from({ length: picsPerScroll }, (_, i) => i + 1);
    const [pictures, setPictures] = useState(firstPictures);

    const onHandlePictureClick = (id) => {
        setModalIsOpen(false);
        setData({ ...data, cover_id: id });
    }

    const openPhotosModal = (e) => {
        e.preventDefault();

        setPictures(firstPictures);
        setModalIsOpen(true);
    };

    const closePhotosModal = () => {
        setModalIsOpen(false);

        reset();
    };

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route('albums.update', { album: album.data.id }));
    };

    const addPictures = () => {
        const lastPicId = pictures.slice(-1)[0];
        if (lastPicId < maxPicId - picsPerScroll) {
            const newIds = Array.from({ length: picsPerScroll }, (_, i) => i + 1 + lastPicId);
            setPictures([...pictures, ...newIds]);
        }
    };

    const onHandleScroll = e => {
        const bottom = (e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
        if (bottom) {
            addPictures();
        }
    };

    return (
        <ContentLayout title={'Album - ' + album.data.name}>
            <div className='p-3 text-3xl bg-gradient-to-r from-purple-600 to-indigo-900 rounded text-gray-100 font-mono'>
                Editing album - {album.data.name}
            </div>

            <PhotosModal
                show={modalIsOpen}
                onClose={closePhotosModal}
                pictures={pictures}
                onPictureClick={onHandlePictureClick}
                onPicturesScroll={onHandleScroll}
            />

            <ConfirmModal
                show={deleteModalIsOpen}
                onClose={() => setDeleteModalIsOpen(false)}
                onCancel={() => setDeleteModalIsOpen(false)}
                onConfirm={() => router.delete(route('albums.destroy', { album: album.data.id }))}
            >
                Confirm delete album {album.data.name}?
            </ConfirmModal>

            <form className="mt-10 max-w-xl" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextArea
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        rows={3}
                        maxLength={300}
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="cover_id" value="Cover Id - pick one or set the number directly" />

                    <TextInput
                        id="cover_id"
                        name="cover_id"
                        value={data.cover_id}
                        className="mt-1 block w-full"
                        onChange={onHandleChange}
                        type='number'
                        min={1}
                        max={maxPicId}
                        required
                    />

                    <InputError message={errors.cover_id} className="mt-2" />
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-evenly sm:items-start mt-1 w-full p-3 border rounded border-gray-300 bg-gradient-to-t from-gray-100 to-indigo-50">
                    <img src={getPicsumPhoto(data.cover_id, 400, 300)} alt="Album cover" />
                    <Button colorType={BUTTON_TYPE.INFO}
                        className='mt-2 sm:mt-0 whitespace-nowrap'
                        onClick={openPhotosModal}
                    >
                        Pick one <IconClick className="inline" size={22} />
                    </Button>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={() => setDeleteModalIsOpen(true)}
                        className="underline text-red-400"
                    >
                        Delete album
                    </button>
                    <PrimaryButton disabled={processing}>
                        Update album
                    </PrimaryButton>
                </div>
            </form>
        </ContentLayout>
    );
};