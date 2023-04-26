const Panel = ({ title = '', className = '', titleClassName = '', children }) => {
    return (
        <div className={`mt-8 bg-slate-200 rounded drop-shadow-lg ${className}`}>
            <div className={`p-2 text-gray-200 bg-violet-800 rounded-t ${titleClassName}`}>{title}</div>
            {children}
        </div>
    );
};

export default Panel;