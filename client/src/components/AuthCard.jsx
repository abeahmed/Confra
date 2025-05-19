import React from 'react';

const AuthCard = ( {title, children, onSubmit} ) => {
    return (
        <div className = "flex-1 flex items-center justify-center px-10 py-8">
            <div className = "w-full max-w-md p-8 bg-zinc-950 rounded-xl shadow-lg border border-zinc-800">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">{title}</h1>
                <form onSubmit={onSubmit} className="flex flex-col items-center space-y-6">{children}</form>
            </div>
        </div>
    )
}

export default AuthCard;