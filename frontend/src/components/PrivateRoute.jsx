import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Non loggato → redirect al login
        return <Navigate to="/login" replace />;
    }

    // Utente loggato → mostra contenuto
    return children;
};

export default PrivateRoute;
