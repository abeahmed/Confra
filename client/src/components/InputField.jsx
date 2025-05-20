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
    const styling = `w-full p-2 rounded-md border-5 border-zinc-800 focus:outline-none 
    focus:border-5 focus:border-rose-900 mb-10`

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