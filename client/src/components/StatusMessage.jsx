// client/src/components/StatusMessage.jsx
import React from 'react';
import Alert from './Alert';
import Text from './Text';
import Button from './Button';

function StatusMessage({ 
    alertType = 'error',
    alertMessage,
    description,
    buttons = [], 
    className = '',
    children
}) {
    return (
        <div className={`flex-col flex items-center justify-center gap-4 ${className}`}>
            <Alert type={alertType}>{alertMessage}</Alert>
            <Text variant="body">{description}</Text>
            {children}
        </div>
    );
}

export default StatusMessage;