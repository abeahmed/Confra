import {Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import NavLink from './NavLink';
const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();

    console.log('Auth state in Navigation:', { isAuthenticated, user }); 

    return (
        <nav>
            <div className="flex justify-between items-center px-10 py-4 shadow-lg bg-zinc-950 border-b border-zinc-800 mb-8">
                <Link to="/" className="text-2xl font-bold text-gray-200">Confra</Link>
                <div className="flex gap-4">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/create-event">Create Event</NavLink>
                            <Button onClick={logout} variant="nav" to="/">Logout</Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="text-lg text-gray-300 hover:text-white hover:text-bold">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
    
}

export default Navigation;