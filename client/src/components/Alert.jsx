import React from 'react';

function Alert({ type = 'error', children, className = '' }) {

    const base = "p-4 rounded-lg text-center border font-medium mb-6"; 
    const variants = {
        error: `${base} text-red-200 bg-red-900/50 border-red-800`,
        success: `${base} text-green-200 bg-green-900/50 border-green-800`,
        info: `${base} text-blue-200 bg-blue-900/50 border-blue-800`,
        warning: `${base} text-yellow-200 bg-yellow-900/50 border-yellow-800`
    };

    return <div className={`${variants[type]} ${className}`}>
        {children}
    </div>
}

export default Alert;