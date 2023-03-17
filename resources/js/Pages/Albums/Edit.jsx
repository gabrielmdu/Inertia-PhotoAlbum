import React from "react";
import ContentLayout from '@/Layouts/ContentLayout'
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import TextArea from "@/Components/TextArea";

export default function EditAlbum({ album }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: album.data.name,
        description: album.data.description,
        cover_id: album.data.cover_id
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route('albums.update', { album: album.data.id }));
    };

    return (
        <ContentLayout title={'Album - ' + album.data.name}>
            <div className='p-3 text-3xl bg-gradient-to-r from-purple-600 to-indigo-900 rounded text-gray-100 font-mono'>
                Editing album - {album.data.name}
            </div>

            <form className="mt-10" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full max-w-xl"
                        autoComplete="name"
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

                <PrimaryButton className="mt-4" disabled={processing}>
                    Confirm
                </PrimaryButton>
            </form>
        </ContentLayout>
    );
};