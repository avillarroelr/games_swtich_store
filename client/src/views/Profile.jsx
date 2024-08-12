import React from 'react';
import { Card, Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Profile = ({ user, wishlist }) => {
    const navigate = useNavigate();
    const { addToCart, removeFromCart, formatNumber, cartItems } = useCart();

    const isInCart = (gameId) => {
        return cartItems.some(item => item.id_juego === gameId);
    };

    return (
        <Container style={{ marginTop: '80px' }}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md={4} className="d-flex justify-content-center">
                                    <Image 
                                        src={user.avatar} 
                                        alt="Avatar" 
                                        roundedCircle 
                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Title>Perfil de Usuario</Card.Title>
                                    <Card.Text><strong>Nombre:</strong> {user.nombre}</Card.Text>
                                    <Card.Text><strong>Apellido:</strong> {user.apellido}</Card.Text>
                                    <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                                    <Card.Text><strong>Fecha de Registro:</strong> {user.fecha_registro}</Card.Text>
                                    <Card.Text><strong>Rol:</strong> {user.rol === "1" ? "Administrador" : "Usuario"}</Card.Text>
                                    {user.rol === "1" && (
                                        <div className="mt-3">
                                            <Button variant="primary" className="mb-2 me-2" onClick={() => navigate('/agregar-juego')}>
                                                Agregar Juego
                                            </Button>
                                            <Button variant="secondary" className="mb-2 me-2" onClick={() => navigate('/administrar-usuarios')}>
                                                Administrar Usuarios
                                            </Button>
                                            <Button variant="info" className="mb-2" onClick={() => navigate('/administrar-juegos')}>
                                                Administrar Lista de Juegos
                                            </Button>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    {user.rol !== "1" && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>Lista de Deseos</Card.Title>
                                <ListGroup variant="flush">
                                    {wishlist.length > 0 ? (
                                        wishlist.map((game, index) => (
                                            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <Image 
                                                        src={game.url_imagen_juego} 
                                                        alt={game.titulo} 
                                                        thumbnail 
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                                                    />
                                                    <span>{game.titulo}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-3"><strong>Precio:</strong> ${formatNumber(game.precio)}</span>
                                                    {isInCart(game.id_juego) ? (
                                                        <Button variant="danger" onClick={() => removeFromCart(game.id_juego)}>Quitar del Carrito</Button>
                                                    ) : (
                                                        <Button variant="success" onClick={() => addToCart(game)}>Añadir al Carrito</Button>
                                                    )}
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>
                                            No tienes juegos en tu lista de deseos.
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;






