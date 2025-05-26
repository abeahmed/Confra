import { Link } from 'react-router-dom';

const LinkButton = ({ to, onClick, children, className = '' }) => {
    const baseStyles = "text-gray-400 hover:text-gray-200 text-sm hover:underline cursor-pointer transition-all duration-150";

    return (
        <Link 
            to={to}
            onClick={onClick}
            className={`${baseStyles} ${className}`}
        >
            {children}
        </Link>
    );
};

export default LinkButton;