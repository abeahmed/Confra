import React from 'react';

function ContentCard({ children }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-10 py-8">
            <div className="bg-zinc-950/60 rounded-lg p-6 transition-all duration-300 hover:bg-zinc-950/100 hover:shadow-lg hover:scale-103 will-change-transform">
                {children}
            </div>
        </div>
    );
}

export default ContentCard;