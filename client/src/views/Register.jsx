import React, { useState } from 'react';
import { Form, Button, Card, Carousel, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Register = () => {
    const [newUser, setNewUser] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        fecha_registro: new Date().toLocaleDateString(),
        avatar: '',
    });

    const avatars = [
        "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=740&t=st=1723175058~exp=1723175658~hmac=fcb6b3611866b077333f01ea53317516c43f3b1647b64c4b697ed59065bdf092",
        "https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?w=740&t=st=1723175090~exp=1723175690~hmac=9ba3a31d2018e0e8b2a6280716557c34d6601337250b98ce22d9e14cadf1b15e",
        "https://img.freepik.com/premium-psd/3d-illustration-business-man-with-glasses_23-2149436193.jpg?w=740",
        "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?w=740&t=st=1723175196~exp=1723175796~hmac=c295811c9e39b65d2f49552692312272bf4e0c6256fc1605da5eb8fc0d81389c"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAvatarSelect = (selectedAvatar) => {
        setNewUser({ ...newUser, avatar: selectedAvatar });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/usuarios.json')
            .then(response => response.json())
            .then(data => {
                const newId = data.length > 0 ? (parseInt(data[data.length - 1].id_usuario) + 1).toString() : "1";
                const userWithId = { ...newUser, id_usuario: newId, rol: "usuario" }; // Rol por defecto: usuario
                const updatedUsers = [...data, userWithId];
                return fetch('/usuarios.json', {
                    method: 'PUT', // Cambia a POST cuando usemos el backend
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedUsers)
                });
            })
            .then(response => {
                if (response.ok) {
                    //alert('Usuario registrado con éxito');
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario registrado con éxito',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    //alert('Hubo un problema al registrar el usuario.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un problema al registrar el usuario.',
                        text: 'Por favor, inténtalo nuevamente.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
            .catch(error => console.error('Error al actualizar el archivo JSON:', error));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center align-content-center" style={{ minHeight: '100vh', marginTop: '80px' }}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Regístrate</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control type="text" name="nombre" value={newUser.nombre} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido:</Form.Label>
                                    <Form.Control type="text" name="apellido" value={newUser.apellido} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" name="email" value={newUser.email} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control type="password" name="contrasena" value={newUser.contrasena} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Elige tu Avatar:</Form.Label>
                                    <Carousel interval={null} className="text-center carousel-dark">
                                        {avatars.map((avatar, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block mx-auto"
                                                    src={avatar}
                                                    alt={`Avatar ${index}`}
                                                    onClick={() => handleAvatarSelect(avatar)}
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        borderRadius: '50%', 
                                                        border: newUser.avatar === avatar ? '5px solid red' : 'none',
                                                        width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Registrarse</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

