import React from 'react';

function Alert({ type = 'error', children, className = ''}) {

    const base = "p-4 rounded-lg text-center border font-medium w-full max-w-md"; 
    const variants = {
        error: `${base} text-red-200 bg-red-900/50 border-red-800`,
        success: `${base} text-green-200 bg-green-900/50 border-green-800`,
        info: `${base} text-zinc-400 bg-zinc-800/50 border border-zinc-700/50`,
        warning: `${base} text-yellow-200 bg-zinc-800/50 border border-yellow-800/50`
    };

    return <div className={`${variants[type]} ${className}`}>
        {children}
    </div>
}

export default Alert;