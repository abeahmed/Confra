import React, { useEffect } from 'react';
import Alert from './Alert';
import { LuX } from 'react-icons/lu';

const Toast = ({ message, onClose, duration=3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);


    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="p-4 rounded-lg text-center border font-medium w-full max-w-md text-green-200 bg-green-900/50 border-green-800 flex items-center justify-between">
                <span>{message}</span>
                <button 
                    onClick={onClose}
                    className="ml-2 hover:opacity-75"
                >
                    <LuX className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;