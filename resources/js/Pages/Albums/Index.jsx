import Album from '@/Components/Album';
import ContentLayout from '@/Layouts/ContentLayout';

export default function AlbumsIndex(props) {
    return (
        <ContentLayout
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            title='Albums'
        >
            <div className='p-3 text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-gray-100 font-mono'>My Albums</div>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
                {
                    props.albums.data.length === 0
                        ? <div>There are no albums here :(</div>
                        : props.albums.data.map(a => <Album key={a.id} album={a} />)
                }
            </div>
        </ContentLayout >
    );
}