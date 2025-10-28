// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex gap-4 p-4 bg-gray-200 items-center">
            <Link to="/dashboard" className="font-semibold hover:text-blue-600">
                Dashboard
            </Link>
            <Link to="/kanban" className="font-semibold hover:text-blue-600">
                Kanban
            </Link>
            <div className="ml-auto">
                {user ? (
                    <>
                        <span className="mr-2">Benvenuto, {user.username}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
