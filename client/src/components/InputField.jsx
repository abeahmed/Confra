import React from 'react';

function InputField({
    id,
    type,
    name,
    placeholder,
    value,
    onChange,
    
}) {
    return (
        <div>
            <h2 className="text-2xl mb-6 text-gray-300 text-left">{name}</h2>
            <input className="w-80 p-2 rounded-md border-5 border-zinc-800 focus:outline-none focus:border-5 focus:border-rose-900 mb-10" 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} />
        </div>
    )
}

export default InputField;