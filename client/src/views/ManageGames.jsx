import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ManageGames = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la lista de juegos desde el JSON o API
        fetch('/juegos.json')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error('Error al cargar los juegos:', error));
    }, []);

    const handleDelete = (gameId) => {
        const updatedGames = games.filter(game => game.id_juego !== gameId);
        setGames(updatedGames);

        // Actualizar el archivo JSON o API después de eliminar
        fetch('/juegos.json', {
            method: 'PUT', // Cambia a DELETE si es necesario para tu backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedGames)
        })
        .then(response => {
            if (response.ok) {
                alert('Juego eliminado con éxito');
            } else {
                alert('Hubo un problema al eliminar el juego.');
            }
        })
        .catch(error => console.error('Error al actualizar el archivo JSON:', error));
    };

    const handleEdit = (gameId) => {
        // Redirigir a la página de edición del juego
        navigate(`/editar-juego/${gameId}`);
    };

    return (
        <Container style={{ marginTop: '80px' }}>
            <h2>Administrar Juegos</h2>
            <Row>
                {games.map((game) => (
                    <Col md={4} key={game.id_juego} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={game.url_imagen_juego} alt={game.titulo} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{game.titulo}</Card.Title>
                                <Card.Text>
                                    <strong>Descripción:</strong> {game.descripción}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Precio:</strong> ${game.precio}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Stock:</strong> {game.stock}
                                </Card.Text>
                                <Button variant="danger" className="me-2" onClick={() => handleDelete(game.id_juego)}>
                                    X Eliminar
                                </Button>
                                <Button variant="primary" onClick={() => handleEdit(game.id_juego)}>
                                    Editar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ManageGames;
