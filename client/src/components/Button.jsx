import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({to, onClick, children}) => {

    const styling = "inline-block bg-rose-700 px-10 py-3 rounded-full text-lg font-medium transition hover:bg-rose-500 hover:-translate-y-0.5 shadow-md"
    
    if(to) {
        return (
            <Link 
                to={to} 
                className={styling}>
                {children}
            </Link>
        )
    }

    return (
        <button 
            onClick={onClick} 
            className={styling}>
            {children}
        </button>
    )
}

export default Button;