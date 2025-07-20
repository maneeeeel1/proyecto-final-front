import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import "./StoreSection.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StoreSection = forwardRef(({ isAdminView, onEditProduct, onDeleteProduct }, ref) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();


    const { addToCart } = useCart();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al cargar los productos.");
            }
    
            const data = await response.json();
            const productsWithDisplayQuantity = data.map(product => ({...product, displayQuantity: 0}));
            setProducts(productsWithDisplayQuantity); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchProducts: fetchProducts
    }));

    useEffect(() => {
        fetchProducts();
    }, []); 

    const handleEditClick = (product) => {
        if (onEditProduct) {
            onEditProduct(product);
        }
    };

    const handleDeleteClick = async (productId) => {
        if (onDeleteProduct) {
            await onDeleteProduct(productId);
        }
    };

    const handleQuantityChange = (productId, delta) =>{
        setProducts(prevProducts => 
            prevProducts.map(product => {
                if (product._id === productId){
                    const currentQuantity = typeof product.displayQuantity === "number" ? product.displayQuantity : 0;
                    const newQuantity = Math.max(0, currentQuantity + delta)
                    return { ...product, displayQuantity: newQuantity };
                }
                return product;
            })
        )
        
    }

    const handleAddToCartClick = (product) =>{
        if(product.displayQuantity > 0){
            addToCart(product, product.displayQuantity);
            setProducts(prevProducts =>
                prevProducts.map (p => 
                    p._id === product._id ? {...p, displayQuantity : 0} : p
                )
            );

        }else {
            alert("Selecciona cantidad mayor que 0 para añadir al carrito!")
        }
    }
        
    const sectionClasses = `section ${theme === "light" ? "light-theme" : ""}`;
    const boxClasses = `box ${theme === "light" ? "light-theme" : ""}`;
    const productCardClasses = `product-card ${theme === "light" ? "light-theme" : ""}`;
    const productImageClasses = `product-image ${theme === "light" ? "light-theme" : ""}`;
    const btnShopClasses = `btn-shop ${theme === "light" ? "light-theme" : ""}`;
    const quantityDisplayClasses = `quantity-display ${theme === "light" ? "light-theme" : ""}`;
    const addToCartBtnClasses = `add-to-cart-btn ${theme === "light" ? "light-theme" : ""}`;

    if (loading) {
        return (
            <section id="store" className={sectionClasses}>
                <div className={boxClasses}>
                    <p>Cargando productos...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="store" className={sectionClasses}>
                <div className={boxClasses}>
                    <p>Error: {error}</p>
                    <p>No se pudieron cargar los productos. Inténtalo de nuevo más tarde.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="store" className={sectionClasses}>
            {!isAdminView && <img 
            src={theme === "light" ? "/titles/TIENDA-18-6-2025.png" : "/titles/tienda_dark.png"}
            alt="Jugar"
            className="title"
             />} 
            <div className={boxClasses}>
                {products.length > 0 ? (
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product._id} className={productCardClasses}>
                                <h3>{product.nombre}</h3>
                                <p>{product.precio} $</p>
                                {product.imagen && (
                                    <img 
                                        src={product.imagen} 
                                        alt={product.nombre} 
                                        className={productImageClasses}
                                    />
                                )}
                                {isAdminView && (
                                    <div className="admin-buttons">
                                        <button onClick={() => handleEditClick(product)}>Editar</button>
                                        <button onClick={() => handleDeleteClick(product._id)}>Eliminar</button>
                                    </div>
                                )}
                                {!isAdminView && (
                                    <div>
                                        <div className="quantity-controls" >

                                        <button className={btnShopClasses} onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                                        <span className={quantityDisplayClasses}>{product.displayQuantity}</span>
                                        <button className={btnShopClasses} onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                                        </div>
                                        <button
                                        className={addToCartBtnClasses}
                                        onClick={() => handleAddToCartClick(product)}
                                        disabled={product.displayQuantity === 0}
                                        >AÑADIR A LA CESTA
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay productos disponibles en este momento.</p>
                )}
            </div>
        </section>
    );
});

export default StoreSection;
