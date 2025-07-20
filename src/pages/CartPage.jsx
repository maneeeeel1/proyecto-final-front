import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CartPage() {
    const { cartItems, removeFromCart, updateCartItemQuantity, getTotalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (productId, delta) => {
        const item = cartItems.find(item => item._id === productId);
        if (item) {
            updateCartItemQuantity(productId, item.quantity + delta);
        }
    };

    const handleStripeCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío. Añade productos antes de proceder al pago.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItems }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al iniciar el proceso de pago con Stripe.");
            }

            const { url } = await response.json();
            window.location.href = url;

        } catch (error) {
            console.error("Error durante el checkout con Stripe:", error);
            alert("Hubo un problema al proceder con el pago: " + error.message);
        }

    };


    return (
        <div className="container">
            <h2 className="title">Cesta</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío. ¡Añade algún PokePeluche!</p>
            ) : (
                <div className="cart-content">
                    <ul className="item-list">
                        {cartItems.map(item => (
                            <li key={item._id} className="item-card">
                                <img src={item.imagen} alt={item.nombre} className="item-image" />
                                <div className="item-details">
                                    <h4>{item.nombre}</h4>
                                    <p>${item.precio} c/u</p>
                                    <div className="item-quantity-controls">
                                        <button onClick={() => handleQuantityChange(item._id, -1)} disabled={item.quantity <= 1}>-</button>
                                        <span className="quantity-displays">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                    </div>
                                    <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeFromCart(item._id)} className="remove-button">X</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                        <button onClick={handleStripeCheckout} className="checkout-button">
                            Proceder al Pago
                        </button>
                        <button onClick={clearCart} className="clear-cart-button">
                            Vaciar Carrito
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CartPage;