import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function NavigationBar({ user, onLogout }) {
    const { totalPrice } = useCart();
    const navigate = useNavigate();

    const CustomNavLink = ({ to, children }) => (
        <Nav.Link as={NavLink} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
            {children}
        </Nav.Link>
    );

    return (
        <Navbar fixed="top" className="mb-4" bg="danger" expand="lg">
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
                        {user ? (
                            <>
                                <Nav.Link onClick={onLogout}>Cerrar Sesión</Nav.Link>
                                <CustomNavLink to="/perfil">
                                    <img src={user.avatar} alt="Perfil" style={{ width: '40px', borderRadius: '50%' }} />
                                </CustomNavLink>
                            </>
                        ) : (
                            <>
                                <CustomNavLink to="/login">
                                    Iniciar Sesión
                                </CustomNavLink>
                                <CustomNavLink to="/registrarse">
                                    Registrarse +
                                </CustomNavLink>
                            </>
                        )}
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






