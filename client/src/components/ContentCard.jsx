import React from 'react';

function ContentCard({ children, maxWidth = 'max-w-4xl', onClick}) {
    return (
        <div className={`w-full ${maxWidth} mx-auto px-10 py-8`}>
            <div className={`bg-zinc-950/60 rounded-lg p-6 transition-all duration-300 hover:bg-zinc-950/100
            focus-within:bg-zinc-950/100 focus-within:shadow-lg focus-within:scale-103 hover:shadow-lg 
            hover:scale-103 will-change-transform ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}>
                {children}
            </div>
        </div>
    );
}

export default ContentCard;