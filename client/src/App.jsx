import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import DetalleJuego from "./views/DetalleJuego";
import Carrito from "./views/Carrito";
import AddGame from './views/AddGame';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile';
import ManageUsers from './views/ManageUsers';
import ManageGames from './views/ManageGames';
import { CartProvider } from './context/CartContext';
import EditGame from './views/EditGame';
import Swal from 'sweetalert2';

export default function App() {
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Verificar si hay un usuario logueado y lo guarda en localStorage
        const storedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (storedUser) {
            setUser(storedUser);
            setWishlist(storedUser.wishlist || []);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setWishlist(userData.wishlist || []);
        localStorage.setItem('loggedUser', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        setWishlist([]);
        localStorage.removeItem('loggedUser');
    };

    const handleAddToWishlist = (game) => {
        if (!wishlist.find(item => item.id_juego === game.id_juego)) {
            const updatedWishlist = [...wishlist, game];
            setWishlist(updatedWishlist);

            // Actualizar el usuario en localStorage
            const updatedUser = { ...user, wishlist: updatedWishlist };
            setUser(updatedUser);
            localStorage.setItem('loggedUser', JSON.stringify(updatedUser));

            // Actualizar el archivo usuarios.json
            fetch('/usuarios.json')
                .then(response => response.json())
                .then(data => {
                    const userIndex = data.findIndex(u => u.id_usuario === user.id_usuario);
                    if (userIndex !== -1) {
                        data[userIndex].wishlist = updatedWishlist;
                        return fetch('/usuarios.json', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });
                    }
                })
                .catch(error => console.error('Error al actualizar usuarios.json:', error));
        } else {
            //alert('El juego ya está en tu lista de deseos');
            Swal.fire({
                icon: 'warning',
                title: 'El juego ya está en tu lista de deseos.',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <CartProvider>
            <div className="App"> 
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home user={user} onAddToWishlist={handleAddToWishlist} />} />
                    <Route path="/detallejuego/:id_juego" element={<DetalleJuego user={user} onAddToWishlist={handleAddToWishlist} />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/agregar-juego" element={user && user.rol === "1" ? <AddGame /> : <Login onLogin={handleLogin} />} /> {/* Solo visible para admin  */}
                    <Route path="/administrar-usuarios" element={user && user.rol === "1" ? <ManageUsers /> : <Login onLogin={handleLogin} />} /> {/* Solo visible para admin  */}
                    <Route path="/administrar-juegos" element={user && user.rol === "1" ? <ManageGames /> : <Login onLogin={handleLogin} />} /> {/* Solo visible para admin */}
                    <Route path="/registrarse" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/perfil" element={user ? <Profile user={user} wishlist={wishlist} /> : <Login onLogin={handleLogin} />} />
                    <Route path="/editar-juego/:id_juego" element={user && user.rol === "1" ? <EditGame /> : <Login onLogin={handleLogin} />} />
                </Routes>
            </div>
        </CartProvider>
    );
}







