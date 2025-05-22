import React from 'react';
import { Link } from 'react-router-dom';
const Button = ({to, onClick, children, variant='default', className='', icon: Icon }) => {

    const baseStyling = "hover:cursor-pointer rounded-full font-medium transition flex items-center justify-center";

const variants = {
  default: "bg-rose-700 hover:bg-rose-500 px-6 py-3 md:px-10 md:py-4 text-gray-100 hover:-translate-y-0.5 shadow-md mb-6 text-base md:text-lg",
  nav: "bg-transparent border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:border-rose-700 hover:text-zinc-900 px-4 py-2 md:px-6 md:py-2 text-md md:text-lg",
  secondary: "bg-transparent border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:border-rose-700 hover:text-zinc-900 px-4 py-2 md:px-6 md:py-3 min-w-[8rem] max-w-full text-center text-md md:text-lg hover:scale-105 transition-transform duration-300",
  icon: "bg-transparent border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:border-rose-700 hover:text-zinc-900 w-12 h-12 md:w-14 md:h-14 hover:scale-105 transition-transform duration-300"  

};

    const styling = `${baseStyling} ${variants[variant]} ${className}`

    const isIconOnly = variant === "icon";
    const content = Icon ? (
        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${!isIconOnly ? 'mr-2' : ''}`} />
    ) : null;
     
    if(to) {
        return (
            <Link 
                to={to} 
                className={styling}>
                {content}
                {children}
            </Link>
        )
    }

    return (
        <button 
            onClick={onClick} 
            className={styling}>
            {content}
            {children}
        </button>
    )
}

export default Button;