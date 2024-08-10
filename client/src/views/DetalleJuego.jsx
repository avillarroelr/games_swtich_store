import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const DetalleJuego = ({ user, onAddToWishlist }) => {
    const { id_juego } = useParams();
    const [juego, setJuego] = useState(null);
    const { addToCart, formatNumber } = useCart();

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
            <Card>
                <Card.Img variant="top" src={juego.url_imagen_juego} alt={juego.titulo} />
                <Card.Body>
                    <Card.Title>{juego.titulo}</Card.Title>
                    <Card.Text>{juego.descripción}</Card.Text>
                    <h4>Precio: ${formatNumber(juego.precio)}</h4>
                    <Button variant="danger" onClick={() => addToCart(juego)}>Añadir al Carrito</Button>
                    {user && (
                        <button
                            className={`button-favorite ${isFavorited ? 'favorited' : ''}`}
                            onClick={() => {
                                onAddToWishlist(juego);
                                alert(isFavorited ? 'Eliminado de la lista de deseos' : 'Agregado a la lista de deseos');
                            }}
                        >
                            {isFavorited ? '❤️' : '🤍'}
                        </button>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DetalleJuego;


