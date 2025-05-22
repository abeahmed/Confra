import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import NavLink from './NavLink';
import { LuMenu, LuX } from 'react-icons/lu';

const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowMobileMenu(false);
    };

    const AuthenticatedLinks = () => (
        <>
          <NavLink to="/dashboard" onClick={() => setShowMobileMenu(false)}>Dashboard</NavLink>
          <NavLink to="/create-event" onClick={() => setShowMobileMenu(false)}>Create Event</NavLink>
          <Button onClick={handleLogout} variant="nav">Logout</Button>
        </>
    );

    const UnauthenticatedLinks = () => (
        <>
          <NavLink to="/login" onClick={() => setShowMobileMenu(false)}>Login</NavLink>
          <NavLink to="/register" onClick={() => setShowMobileMenu(false)}>Register</NavLink>
        </>
      );

    return (
        <nav>
            <div className="flex justify-between items-center px-10 py-4 shadow-lg bg-zinc-950 border-b border-zinc-800 mb-8">
                <Link to="/" className="text-2xl font-bold text-gray-200">Confra.</Link>
                <div className="hidden md:flex gap-4">
                    {isAuthenticated ? (
                        <AuthenticatedLinks />
                    ) : (
                        <UnauthenticatedLinks />
                    )}
                </div>
                

                <button 
                    className="md:hidden text-gray-400 hover:text-gray-200 cursor-pointer"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <LuX size={30} /> : <LuMenu size={30} />}
                </button>
            </div>
                {showMobileMenu && (
                    <>
                    <div className={`md:hidden absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 px-12 py-8 duration-1000 ease-in-out transform ${
                    showMobileMenu ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <div className="flex flex-col gap-6 text-center mt-6 mb-6 max-w-sm mx-auto">
                            {isAuthenticated ? (
                                <AuthenticatedLinks />
                            ) : (
                                <UnauthenticatedLinks />
                            )}
                        </div>
                    </div>
                    </>
                )}

        </nav>
    )
    
}

export default Navigation;