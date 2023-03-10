import ContentLayout from '@/Layouts/ContentLayout';

export default function Albums(props) {
    return (
        <ContentLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            title='Albums'
        >
            Albums
        </ContentLayout >
    );
}