import { Head } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function Content({ header, title, children }) {
    return (
        <AuthenticatedLayout header={header}>
            <Head title={title} />

            <div className="flex flex-1 flex-col justify-center items-center py-3 sm:py-6">
                <div className="flex flex-1 w-full max-w-7xl h-full sm:px-6 lg:px-8">
                    <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};