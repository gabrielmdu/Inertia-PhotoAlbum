import ContentLayout from '@/Layouts/ContentLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <ContentLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            title="Dashboard"
        >
            <div>You're logged in! You can:</div>

            <ul className='mt-4 list-disc pl-4'>
                <li><Link className='underline' href={route('albums.index')}>View your albums</Link></li>
            </ul>
        </ContentLayout>
    );
}
