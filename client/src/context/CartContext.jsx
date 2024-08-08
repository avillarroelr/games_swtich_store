import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Dando formato 'es-CL' a valores para separador de miles 
    const formatNumber = (number) => {
        return number.toLocaleString('es-CL');
    };

    // Recalcula el precio en el totalPrice cada vez que la cantidad cambia en cartItems
    const rawTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    // Formatea el totalPrice para incluir separadores de miles
    const totalPrice = formatNumber(rawTotalPrice);

    // Agrega pizzas al carro cartItems
    const addToCart = (item) => {
        const exists = cartItems.find(cartItem => cartItem.id === item.id);
        if (exists) {
            const updatedCartItems = cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCartItems);
            alert(`Pizza Añadida al carrito!`);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            alert(`Pizza Añadida al carrito!`);
        }
    };

    // Quita pizzas del carro
    const removeFromCart = (itemId) => {
        const exists = cartItems.find(cartItem => cartItem.id === itemId);
        if (exists && exists.quantity > 1) {
            const updatedCartItems = cartItems.map(cartItem =>
                cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            );
            setCartItems(updatedCartItems);
        } else {
            setCartItems(cartItems.filter(item => item.id !== itemId));
        }
        alert('Pizza eliminada del carrito');
    };

    // Exporta valores para ítems del carro, agregar al carro, sacar del carro, precio total y formato de valores para ser consultados por vistas y componentes
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, formatNumber }}>
            {children}
        </CartContext.Provider>
    );
};
