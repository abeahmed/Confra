import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({to, onClick, children, variant='default'}) => {

    const baseStyling = "inline-block bg-rose-700 rounded-full text-lg font-medium transition flex items-center justify-center"
    
    const variants = {
        default: "bg-rose-700 px-10 py-3 hover:bg-rose-500 hover:-translate-y-0.5 shadow-md",
        nav: "bg-rose-700 px-4 py-2 hover:bg-rose-500"
    }

     const styling = `${baseStyling} ${variants[variant]}`
     
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