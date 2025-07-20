import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart(); 
    }, [clearCart]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px", padding: "20px", backgroundColor: "#e6ffe6", borderRadius: "10px", maxWidth: "600px", margin: "100px auto" }}>
            <h2 style={{ color: "#28a745" }}>¡Pago Exitoso! 🎉</h2>
            <p>Gracias por tu compra. Tu pedido de Pokepeluche está en camino.</p>
            <img src="/pokeball_success.gif" alt="Success" style={{ maxWidth: "150px", margin: "20px auto" }} />
            <p><a href="/" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>Volver al inicio</a></p>
        </div>
    );
}
export default SuccessPage;