import React from 'react';
import Text from './Text';

const AuthCard = ( {title, children, onSubmit} ) => {
    return (
        <div className = "flex-1 flex items-center justify-center">
            <div className = "w-full max-w-md bg-zinc-950 rounded-xl shadow-lg border border-zinc-800 px-10 py-8">
                <Text variant="h2" className="text-center mb-8">{title}</Text>
                <form onSubmit={onSubmit} className="flex flex-col items-center space-y-6">{children}</form>
            </div>
        </div>
    )
}

export default AuthCard;