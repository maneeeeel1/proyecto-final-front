import React from 'react';

function CancelPage() {
    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#ffe6e6", borderRadius: "10px", maxWidth: "600px", margin: "100px auto" }}>
            <h2 style={{ color: "#dc3545" }}>Pago Cancelado</h2>
            <p>Tu pago fue cancelado. No se ha realizado ningún cargo.</p>
            <p>Si tienes alguna pregunta o deseas intentar de nuevo, por favor contáctanos o vuelve a tu carrito.</p>
            <p><a href="/cart" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>Volver a tu cesta</a></p>
        </div>
    );
}
export default CancelPage;