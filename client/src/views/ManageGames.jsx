import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const handleBack = () => {
        navigate(-1); // Navega a la página anterior 
    };

    const handleDelete = (gameId) => {
        const updatedGames = games.filter(game => game.id_juego !== gameId);
        setGames(updatedGames);
        fetch('/juegos.json', {
            method: 'PUT', // Aquise cambiara a DELETE para el backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedGames)
        })
            .then(response => {
                if (response.ok) {
                    //alert('Juego eliminado con éxito');
                    Swal.fire({
                        icon: 'success',
                        title: 'Juego eliminado con éxito',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    //alert('Hubo un problema al eliminar el juego.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema al eliminar el juego.',
                        text: 'Por favor, inténtalo nuevamente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Administrar Juegos</h2>
                <Button variant="primary" type="button" className='btn btn-success' onClick={handleBack}>
                    Volver a Perfil
                </Button>
            </div>
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
