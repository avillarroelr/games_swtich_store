import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';

const DetalleJuego = ({ user, onAddToWishlist }) => {
    const { id_juego } = useParams();
    const [juego, setJuego] = useState(null);
    const { addToCart, formatNumber } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/juegos.json')
            .then(response => response.json())
            .then(data => {
                const foundGame = data.find(game => game.id_juego === id_juego);
                setJuego(foundGame);
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, [id_juego]);

    if (!juego) {
        return <div>Cargando...</div>;
    }

    const isFavorited = user && user.wishlist && user.wishlist.find(item => item.id_juego === juego.id_juego);

    return (
        <Container style={{ marginTop: '80px' }}>
            <Card style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Card.Img variant="top" src={juego.url_imagen_juego} alt={juego.titulo} />
                <Card.Body>
                    <Card.Title>{juego.titulo}</Card.Title>
                    <Card.Text style={{ textAlign: "justify" }}>{juego.descripción}</Card.Text>
                    <h4>Precio: ${formatNumber(juego.precio)}</h4>
                    <div className="d-flex justify-content-between">
                        <Button variant="danger" onClick={() => addToCart(juego)} className="me-2">Añadir al Carrito</Button>
                        {user && (
                            <button
                                className={`button-favorite ${isFavorited ? 'favorited' : ''}`}
                                onClick={() => {
                                    onAddToWishlist(juego);
                                    Swal.fire({
                                        icon: isFavorited ? 'info' : 'success',
                                        title: isFavorited ? 'Eliminado de la lista de deseos' : 'Agregado a la lista de deseos',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }}
                            >
                                {isFavorited ? '❤️' : '🤍'}
                            </button>
                        )}
                    </div>
                    <Button variant="success" className="mt-3" onClick={() => navigate('/')}>Volver a lista de juegos</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetalleJuego;
