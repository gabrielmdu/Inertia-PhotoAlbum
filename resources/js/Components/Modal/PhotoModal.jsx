import { getPicsumPhoto } from "@/common";
import React, { useRef, useState } from "react";
import Modal from "./Modal";
import ReactTimeAgo from "react-time-ago";
import { IconCheck, IconDotsVertical, IconEdit, IconX } from "@tabler/icons-react";
import TextArea from "../TextArea";
import axios from "axios";
import Dropdown from "../Dropdown";
import ConfirmModal from "./ConfirmModal";
import { router } from "@inertiajs/react";

const PhotoModal = ({ photo, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [savedPhoto, setSavedPhoto] = useState(photo);
    const [photoData, setPhotoData] = useState(photo);

    const refForm = useRef();

    const onHandleChange = (event) => {
        const fm = new FormData(refForm.current);
        const formDataObj = {};
        fm.forEach((value, key) => (formDataObj[key] = value));

        setPhotoData({ ...photoData, ...formDataObj });
    }

    const confirmEditing = async () => {
        try {
            await axios.put(route('api.photos.update', { photo: photo.id }), photoData);
            setSavedPhoto(photoData);
            setIsEditing(false);
        } catch (error) {

        }
    };

    const cancelEditing = () => {
        setPhotoData(savedPhoto);
        setIsEditing(false);
    };

    const handleOnConfirmDelete = async () => {
        await axios.delete(route('api.photos.destroy', { photo: photo.id }));

        router.visit(window.location.href, {
            preserveScroll: true,
            only: ['photos']
        });
    };

    return (
        <Modal maxWidth="xl" {...props}>
            <div className="flex flex-col items-center">
                <div className={"relative w-full h-0 pb-[114.3%] bg-gradient-to-b from-gray-200 to-gray-400 " + (isLoading ? 'animate-pulse' : '')}>
                    <img className="absolute block w-full h-full" onLoad={() => setIsLoading(false)} src={getPicsumPhoto(savedPhoto.api_id, 600, 700)} alt="Photo" />

                    <div className="absolute right-1 top-1">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center py-1 border border-gray-500 hover:border-transparent rounded-md text-gray-700 bg-white/25 hover:bg-white/60 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        <IconDotsVertical stroke={2} />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Button onClick={() => setIsDeleteModalOpen(true)}>Delete photo</Dropdown.Button>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full p-2 bg-stone-900">

                    <div className="flex justify-between w-full h-6 text-gray-400 text-sm">
                        <ReactTimeAgo date={new Date(savedPhoto.created_at)} />
                        <div className="flex items-center hover:text-gray-200">
                            {!isEditing
                                ? <button type="button" onClick={() => setIsEditing(true)}>
                                    <IconEdit size={20} stroke={1.5} />
                                </button>
                                : <React.Fragment>
                                    <span className="mr-2">Confirm?</span>
                                    <button className="mr-1 hover:text-lime-500" onClick={confirmEditing}>
                                        <IconCheck size={20} stroke={1.7} />
                                    </button>
                                    <button className="hover:text-red-500" onClick={cancelEditing}>
                                        <IconX size={18} stroke={1.7} />
                                    </button>
                                </React.Fragment>
                            }
                        </div>
                    </div>

                    {
                        !isEditing
                            ? <div className="whitespace-pre-line mt-1 text-gray-100">
                                {savedPhoto.caption}
                            </div>
                            : <form ref={refForm}>
                                <TextArea
                                    id="caption"
                                    name="caption"
                                    value={photoData.caption}
                                    className="mt-1 block w-full"
                                    rows={3}
                                    maxLength={500}
                                    onChange={onHandleChange}
                                />
                            </form>
                    }
                </div>
            </div>

            {isDeleteModalOpen
                && <ConfirmModal
                    show={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleOnConfirmDelete}
                >
                    Confirm delete photo?
                </ConfirmModal>
            }
        </Modal>
    );
};

export default PhotoModal;