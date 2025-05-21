import React from 'react';
import StatusMessage from './StatusMessage';
import Spinner from './Spinner';

function Loading({ message = 'Loading...', className = '' }) {
    return (
        <StatusMessage 
            alertType="info"
            alertMessage={message}
            className={className}
        >
            <Spinner />
        </StatusMessage>
    );
}

export default Loading;