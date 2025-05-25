import React from 'react';
import Text from './Text';

function InputField({
    id,
    type,
    name,
    placeholder,
    value,
    onChange,
    children,
    required,
}) {
    const styling = `w-full p-2 rounded-md border-2 border-zinc-800 focus:outline-none bg-zinc-800/30
    focus:border-rose-900 transition-all duration-150 mb-6`

    return (

        
        <div className = "w-full">
            <Text variant="bodyLarge" className="text-left">{name}</Text>
            {type === 'select' ? (
            
            <select 
                className={styling}
                id={id}
                value={value}
                onChange={onChange}
                required={required} 
            >
                {children}
            </select>
            ) : type === 'textarea' ? (
                <textarea 
                    className={styling}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={4}
                    required={required} 
                />
            ) : (
            
            <input className={styling} 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                required={required} 
            />
            )}
        </div>
    )
}

export default InputField;