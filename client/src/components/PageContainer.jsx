import React from 'react';

function PageContainer({ children, className = '' }) {
    return (
        <div className={`w-full max-w-4xl px-10 py-8 mx-auto flex-1 flex items-center justify-center`}>
            <div className={`w-full ${className}`}>
                {children}
            </div>
        </div>
    );
}

export default PageContainer;