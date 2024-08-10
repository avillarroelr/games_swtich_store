import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Cargar la lista de usuarios desde el JSON
        fetch('/usuarios.json')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error al cargar los usuarios:', error));
    }, []);

    const handleDelete = (userId) => {
        const updatedUsers = users.filter(user => user.id_usuario !== userId);
        setUsers(updatedUsers);

        // Actualizar el archivo JSON después de eliminar
        fetch('/usuarios.json', {
            method: 'PUT', // Cambia a DELETE cuando se use el backend
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUsers)
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario eliminado con éxito');
            } else {
                alert('Hubo un problema al eliminar el usuario.');
            }
        })
        .catch(error => console.error('Error al actualizar el archivo JSON:', error));
    };

    const handleEdit = (userId) => {
        // Redirigir a la página de edición del usuario
        window.location.href = `/editar-usuario/${userId}`;
    };

    return (
        <Container style={{ marginTop: '80px' }}>
            <h2>Administrar Usuarios</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id_usuario}>
                            <td>{user.id_usuario}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.email}</td>
                            <td>{user.rol === "1" ? "Administrador" : "Usuario"}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleEdit(user.id_usuario)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(user.id_usuario)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ManageUsers;
