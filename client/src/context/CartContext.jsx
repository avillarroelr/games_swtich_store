import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const formatNumber = (number) => {
        return number.toLocaleString('es-CL');
    };

    const rawTotalPrice = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
    const totalPrice = formatNumber(rawTotalPrice);

    const addToCart = (item) => {
        const exists = cartItems.find(cartItem => cartItem.id_juego === item.id_juego);
        if (exists) {
            const updatedCartItems = cartItems.map(cartItem =>
                cartItem.id_juego === item.id_juego ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCartItems);
            alert(`Juego Añadido al carrito!`);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            alert(`Juego Añadido al carrito!`);
        }
    };

    const removeFromCart = (itemId) => {
        const exists = cartItems.find(cartItem => cartItem.id_juego === itemId);
        if (exists && exists.quantity > 1) {
            const updatedCartItems = cartItems.map(cartItem =>
                cartItem.id_juego === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems(cartItems.filter(item => item.id_juego !== itemId));
        }
        alert('Juego eliminado del carrito');
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, formatNumber }}>
            {children}
        </CartContext.Provider>
    );
};
