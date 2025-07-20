import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCart = localStorage.getItem("cartItems");
            return localCart ? JSON.parse(localCart) : [];
        } catch (e) {
            console.error("error al cargar desde localstorage", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } catch (e) {
            console.error("error al guardar", e);
        }
    }, [cartItems]);

    const addToCart = (productToAdd, quantityToAdd) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item._id === productToAdd._id);
            if (existingItemIndex !== -1) {
                return prevItems.map((item,index) =>
                    index === existingItemIndex
                    ? {...item, quantity: item.quantity + quantityToAdd} : item
                );
            } else {
                return [...prevItems, { ...productToAdd, quantity: quantityToAdd }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const updateCartItemQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: Math.max(0, newQuantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => 
            total + (Number(item.precio)|| 0) * (Number(item.quantity) || 0), 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            clearCart,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart es undefined");
    }
    return context;
};