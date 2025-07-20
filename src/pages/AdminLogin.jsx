import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminLogin = () =>{
    const [form, setForm] = useState({username:"", password:""});
    const { setAuthenticated } = useAuth();
    const navigate= useNavigate();
    const [ error, setError] =useState("");

    const handleChange =(e)=>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        try{
            const res = await fetch(`${API_BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            if(!res.ok){
                const err = await res.json();
                return setError(err.error);
            }

            setAuthenticated(true);
            navigate("/admin/dashboard");
        }catch (err){
            setError("Error de conexión con server");
        }
    };

    return(
        <div className="session">
            <h2>Iniciar sesión como admin</h2>
            <form onSubmit={handleSubmit}>
                <input
                name="username"
                placeholder="Usuario"
                value={form.username}
                onChange={handleChange}
                />
                <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                />
                <button type="submit">Entrar</button>
                
            </form>
            {error && <p style={{color:"red"}}>{error}</p>}
        </div>
    )
};

export default AdminLogin;