import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/kanban">Kanban</Link>
            {user ? (
                <button onClick={logout}>Logout ({user.username})</button>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
