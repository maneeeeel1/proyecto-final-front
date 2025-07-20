import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) =>{
    const { authenticated, checking } = useAuth();

    if (checking) return <p>Cargando...</p>;

    return authenticated ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;