import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    navigate('/perfil');
                } else {
                    alert('Credenciales incorrectas');
                }
            });
    };

    return (
        <div>
            <br />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="contrasena" value={credentials.contrasena} onChange={handleChange} required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;

