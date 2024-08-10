import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

const GameForm = ({ onAddGame }) => {
    const [newGame, setNewGame] = useState({
        url_imagen_juego: '',
        titulo: '',
        descripción: '',
        precio: '',
        stock: '',
        categoría: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGame({ ...newGame, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setNewGame({ ...newGame, categoría: value.split(',').map(cat => cat.trim()) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGame(newGame);
        setNewGame({
            url_imagen_juego: '',
            titulo: '',
            descripción: '',
            precio: '',
            stock: '',
            categoría: []
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Agregar Nuevo Juego</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>URL de la Imagen:</Form.Label>
                                    <Form.Control type="text" name="url_imagen_juego" value={newGame.url_imagen_juego} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Título:</Form.Label>
                                    <Form.Control type="text" name="titulo" value={newGame.titulo} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control as="textarea" name="descripción" value={newGame.descripción} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Precio:</Form.Label>
                                    <Form.Control type="number" name="precio" value={newGame.precio} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock:</Form.Label>
                                    <Form.Control type="number" name="stock" value={newGame.stock} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoría (separadas por comas):</Form.Label>
                                    <Form.Control type="text" name="categoría" value={newGame.categoría.join(', ')} onChange={handleCategoryChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">Agregar Juego</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GameForm;


