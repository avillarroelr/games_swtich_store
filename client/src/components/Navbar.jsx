import React from 'react';
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../index.css';

export default function NavigationBar() {
    // Usa useCart para acceder al total del carrito
    const { totalPrice } = useCart();

    // Definiendo componente NavLink para usar con react-bootstrap
    const CustomNavLink = ({ to, children }) => (
        <Nav.Link as={NavLink} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
            {children}
        </Nav.Link>
    );
    // Renderizando el navbas con las rutas a home y carrito
    return (
        <Navbar fixed="top" className="mb-4" bg="info" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img src="./src/img/icon_tienda.png" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-main">
                        <CustomNavLink to="/">
                            Games Switch Store
                        </CustomNavLink>
                    </Nav>
                    <Nav>
                        <img src="./src/img/shopping-cart.png" alt="Carrito" />
                        <CustomNavLink to="/carrito">
                            ${totalPrice}
                        </CustomNavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

