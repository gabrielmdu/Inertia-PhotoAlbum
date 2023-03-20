import React, { useState } from "react";
import ContentLayout from '@/Layouts/ContentLayout'
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";
import Modal from "@/Components/Modal";

const PicturesModal = ({ pictures, onPictureClick, onPicturesScroll, ...props }) => {
    return (
        <Modal {...props}>
            <div className="flex flex-col px-3 py-4 h-[32rem]">
                <div className="mb-2 px-2 py-2 rounded bg-lime-500 text-gray-700 shadow-inner">
                    Select a picture
                </div>

                <div
                    id="scroll-pictures"
                    className="flex-1 border border-blue-100 overflow-y-auto grid grid-cols-3 gap-2"
                    onScroll={onPicturesScroll}
                >
                    {pictures.map(picId =>
                        <div key={picId} className='relative group cursor-pointer' onClick={() => onPictureClick(picId)}>
                            <img className="group-hover:opacity-60 transition ease-in-out duration-100" src={`https://picsum.photos/id/${picId}/200`}></img>
                            <div className="absolute opacity-0 group-hover:opacity-100 rounded bg-orange-400 text-gray-200 px-4 py-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{picId}</div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default function EditAlbum({ album }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: album.data.name,
        description: album.data.description,
        cover_id: album.data.cover_id
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

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

            <PicturesModal
                show={modalIsOpen}
                onClose={closePhotosModal}
                pictures={pictures}
                onPictureClick={onHandlePictureClick}
                onPicturesScroll={onHandleScroll}
            />

            <form className="mt-10" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full max-w-xl"
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
                        className="mt-1 block w-full max-w-xl"
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
                        className="mt-1 block w-full max-w-xl"
                        onChange={onHandleChange}
                        type='number'
                        min={1}
                        max={maxPicId}
                        required
                    />

                    <InputError message={errors.cover_id} className="mt-2" />
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-evenly sm:items-end mt-1 w-full max-w-xl p-3 border rounded border-gray-300 bg-gradient-to-t from-gray-100 to-indigo-50">
                    <img src={`https://picsum.photos/id/${data.cover_id}/400/300`} alt="" />

                    <button
                        type="button"
                        className='flex items-center mt-2 sm:mt-0 px-4 py-2 bg-sky-600 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-sky-700 active:bg-sky-800 transition ease-in-out duration-150'
                        onClick={openPhotosModal}
                    >
                        Pick one
                    </button>
                </div>

                <PrimaryButton className="mt-4" disabled={processing}>
                    Confirm
                </PrimaryButton>
            </form>
        </ContentLayout>
    );
};