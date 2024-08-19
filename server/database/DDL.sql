CREATE DATABASE games_switch_store;

\c games_switch_store;

CREATE TABLE usuarios (
id_usuario SERIAL PRIMARY KEY,
nombre VARCHAR(100),
apellido VARCHAR(100),
email VARCHAR(100) UNIQUE,
contraseña VARCHAR(60),
fecha_registro DATE,
avatar VARCHAR(250),
rol SMALLINT CHECK (rol IN (0, 1)) -- 0 para cliente, 1 para administrador
);

CREATE TABLE categorias (
id_categoria SERIAL PRIMARY KEY,
nombre VARCHAR(50)
);

CREATE TABLE publicaciones (
id_publicacion SERIAL PRIMARY KEY,
id_usuario INT REFERENCES usuarios(id_usuario),
url_imagen_juego VARCHAR(250),
titulo VARCHAR(250),
descripcion TEXT,
precio DECIMAL(10, 2),
stock INT,
estado VARCHAR(10) CHECK (estado IN ('disponible', 'vendido')),
id_categoria INT REFERENCES categorias(id_categoria)
);

CREATE TABLE carrito (
id_usuario INT PRIMARY KEY REFERENCES usuarios(id_usuario),
id_publicacion INT REFERENCES publicaciones(id_publicacion),
fecha_transaccion TIMESTAMPTZ,
monto DECIMAL(10, 2),
estado VARCHAR(20) CHECK (estado IN ('pendiente', 'completado', 'cancelado'))
);

CREATE TABLE favoritos (
id_favorito SERIAL PRIMARY KEY,
id_usuario INT REFERENCES usuarios(id_usuario),
id_publicacion INT REFERENCES publicaciones(id_publicacion),
fecha_valoracion DATE,
valoracion BOOLEAN
);