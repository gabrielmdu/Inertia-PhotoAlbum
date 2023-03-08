import { Head } from "@inertiajs/react";
import React from "react";
import Authenticated from "./AuthenticatedLayout";

export default function Content({ auth, header, title, children }) {
    return (
        <Authenticated auth={auth} header={header}>
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};