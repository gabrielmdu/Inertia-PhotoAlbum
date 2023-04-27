const Panel = ({ className = '', children }) => {
    return (
        <div className={`mt-8 bg-slate-200 rounded drop-shadow-lg ${className}`}>
            {children}
        </div>
    );
};

const Title = ({ className = '', children }) => {
    return (
        <div className={`p-2 text-gray-200 bg-violet-800 rounded-t ${className}`}>
            {children}
        </div>
    );
};

Panel.Title = Title;

export default Panel;