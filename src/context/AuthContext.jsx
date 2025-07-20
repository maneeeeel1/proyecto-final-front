import { createContext, useContext, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [authenticated, setAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    const checkAuth = async () =>{
        try{
            const res = await fetch(`${API_BASE_URL}/api/check-auth`, {
                credentials: "include",
            });
            const data = await res.json();
            setAuthenticated(data.authenticated);

        }catch (err) {
            console.error("Error al autenticar", err);
        }finally{
            setChecking(false);
        }
    };

    useEffect(() =>{
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value={{ authenticated, setAuthenticated, checking}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);