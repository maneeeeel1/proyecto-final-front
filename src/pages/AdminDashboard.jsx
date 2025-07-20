import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StoreSection from "../components/StoreSection";
import React from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () =>{
    const { setAuthenticated }= useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        _id: null,
        nombre: "",
        precio:"",
        imagen:null
    });

    const [msg, setMsg] = useState("");

    const storeSectionRef = useRef();

    const handleLogout = async () =>{
        await fetch(`${API_BASE_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
        });
        setAuthenticated(false);
        navigate("/");
    };

    const handleChange =(e) =>{
        if(e.target.name === "imagen"){
            setForm({...form,imagen:e.target.files[0] });
        }else{
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setMsg("");

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("precio", form.precio);
        if (form.imagen){
            data.append("imagen", form.imagen);
        }
        const method = form._id ? "PUT" : "POST";
        const url = form._id 
            ? `${API_BASE_URL}/api/products/${form._id}` 
            : `${API_BASE_URL}/api/products`;

        try{
            const res = await fetch(url ,{
                method: method,
                credentials: "include",
                body: data
            });

            const result = await res.json();
            if(!res.ok){
                if(res.status === 401){
                    setMsg(result.error || "Sesión no iniciada");
                    setAuthenticated(false);
                    navigate("/");
                }else{
                    setMsg(result.error || "Error al subir producto");
                }
                return
            }

            setMsg("Producto subido ok");
            setForm({ nombre:"", precio: "", imagen: null});
            if(storeSectionRef.current && storeSectionRef.current.fetchProducts){
                storeSectionRef.current.fetchProducts();
            }
        }catch (err) {
            console.error(err);
            setMsg("Error de conexión");
        }
    };

    const handleEditProduct = (productToEdit) =>{
        setForm({
            _id:productToEdit._id,
            nombre: productToEdit.nombre,
            precio: productToEdit.precio,
            imagen: null
        });
        setMsg(`Editando producto: ${productToEdit.nombre}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleDeleteProduct = async (productId) =>{
        if(window.confirm("Estás seguro de querer eliminar el producto?")){
           try{
            const res=await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.error || "Error al eliminar")
            }

            if(storeSectionRef.current && storeSectionRef.current.fetchProducts){
                storeSectionRef.current.fetchProducts();
            }

           } catch (err){
            console.error("Error al eliminar producto", err);
            setMsg("Error al eliminar producto:" + err.message);
           }
        }
    }

    return(
        <div className="paneladmin">
            <h2>Panel de administración</h2>
            <button onClick={handleLogout}>Cerrar Sesión</button>

            <hr />

            <h3>{form._id ? "Editar producto" : "Añadir producto"}:</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
            type="text"
            name="nombre"
            placeholder="Nombre producto"
            value={form.nombre}
            onChange={handleChange}
            required
            />
            <input
            type="number"
            name="precio"
            placeholder="Precio producto"
            value={form.precio}
            onChange={handleChange}
            required
            />
            <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            required={!form._id}
            />
            <button type="submit">{form._id ? "Guardar producto" : "Subir producto" }</button>
            {form._id && (
                <button
                type="button"
                onClick={()=> setForm({_id: null, nombre: "", precio:"", imagen:null})}
                >Cancelar</button>
            )}
            </form>

            <hr />

            <h3>Modificar o eliminar producto:</h3>
            <StoreSection
            isAdminView={true}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            ref={storeSectionRef}
             />

            
        </div>
    )
}
export default AdminDashboard;