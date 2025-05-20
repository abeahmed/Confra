import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({to, onClick, children, variant='default', className=''}) => {

    const baseStyling = "inline-block bg-rose-700 hover:bg-rose-500 rounded-full text-lg font-medium transition flex items-center justify-center"
    
    const variants = {
        default: "px-10 py-3 hover:-translate-y-0.5 shadow-md mb-6",
        nav: "px-4 py-2"
    }

     const styling = `${baseStyling} ${variants[variant]} ${className}`
     
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