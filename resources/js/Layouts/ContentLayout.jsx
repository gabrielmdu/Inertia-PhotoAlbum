import { Head, usePage } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function Content({ title, className = '', children }) {
    const { errors } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={'Inertia Photo Album - ' + title} />

            <div className="flex flex-1 flex-col justify-center items-center py-3 sm:py-6">
                <div className="flex flex-1 w-full max-w-7xl h-full sm:px-6 lg:px-8">
                    <div className={"flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg " + className}>
                        <div className="relative min-h-full p-6 text-gray-900">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};