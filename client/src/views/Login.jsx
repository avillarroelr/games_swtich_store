import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', contrasena: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/usuarios.json')
            .then(response => response.json())
            .then(data => {
                const user = data.find(user => user.email === credentials.email && user.contrasena === credentials.contrasena);
                if (user) {
                    onLogin(user);
                    navigate('/');
                } else {
                    //alert('Credenciales incorrectas');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Credenciales incorrectas.',
                        text: 'Por favor, inténtalo nuevamente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                    });
                }
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={credentials.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="contrasena" 
                                        value={credentials.contrasena} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Iniciar Sesión</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;



