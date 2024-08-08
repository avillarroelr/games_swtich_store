import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Pizza from "./views/Pizzas";
import Carrito from "./views/Carrito";
import { CartProvider } from './context/CartContext';

export default function App() {
    return (
        <CartProvider>
            <div className="App"> 
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pizza/:id" element={<Pizza />} />
                    <Route path="/carrito" element={<Carrito />} />
                </Routes>
            </div>
        </CartProvider>
    );
}

