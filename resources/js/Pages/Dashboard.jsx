import Content from '@/Layouts/ContentLayout';

export default function Dashboard(props) {
    return (
        <Content
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            title="Dashboard"
        >
            You're logged in!
        </Content>
    );
}
