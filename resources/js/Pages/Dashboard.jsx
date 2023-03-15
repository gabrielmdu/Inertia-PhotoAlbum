import ContentLayout from '@/Layouts/ContentLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <ContentLayout title="Dashboard">
            <div>You're logged in! You can:</div>

            <ul className='mt-4 list-disc pl-4'>
                <li><Link className='underline' href={route('albums.index')}>View your albums</Link></li>
            </ul>
        </ContentLayout>
    );
}
