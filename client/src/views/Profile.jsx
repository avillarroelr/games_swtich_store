import React from 'react';

const Profile = ({ user, wishlist }) => {
    return (
        <div>
            <h2>Mi Perfil</h2>
            <div>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Apellido:</strong> {user.apellido}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Fecha de Registro:</strong> {user.fecha_registro}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
                <p><strong>Avatar:</strong></p>
                <img src={user.avatar} alt="Avatar" style={{ width: '100px', borderRadius: '50%' }} />
            </div>
            <h3>Lista de Deseos</h3>
            <ul>
                {wishlist.map((game, index) => (
                    <li key={index}>{game.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;

