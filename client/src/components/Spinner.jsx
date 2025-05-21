import React from 'react';

function Spinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10'
    };

    return (
        <div className={`${sizes[size]} border-2 border-zinc-400 border-t-transparent rounded-full animate-spin ${className}`}></div>
    );
}

export default Spinner;