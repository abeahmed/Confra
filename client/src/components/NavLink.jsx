import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ to, children, onClick }) => {
    return (
    <RouterNavLink to={to} onClick={onClick} className={({ isActive }) => `text-base md:text-lg px-4 py-2 
    rounded-full transition-all duration-300 flex items-center justify-center
    ${isActive ? 'text-gray-200 bg-zinc-800 font-semibold' : 
    'text-gray-400 hover:text-gray-200 hover:bg-zinc-900 font-medium'}`}>
        {children}
    </RouterNavLink>
    
    )
}

export default NavLink;