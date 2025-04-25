-- Creacion de la base de datos
-- CREATE DATABASE IF NOT EXISTS diananailsapp

-- USE diananailsapp

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255),
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla clientes (hereda de usuarios)
CREATE TABLE clientes (
    id INT PRIMARY KEY,
    direccion_envio VARCHAR(255),
    FOREIGN KEY (id) REFERENCES usuarios(id)
);

-- Tabla manicuristas (hereda de usuarios)
CREATE TABLE manicuristas (
    id INT PRIMARY KEY,
    dni VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES usuarios(id)
);

-- Tabla administradores (hereda de usuarios)
CREATE TABLE administradores (
    id INT PRIMARY KEY,
    dni VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES usuarios(id)
);

-- Tabla opiniones (N:1 con clientes)
CREATE TABLE opiniones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    titulo VARCHAR(30) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    estrellas INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

-- Tabla carritos (1:1 con clientes)
CREATE TABLE carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT UNIQUE NOT NULL,
    subtotal FLOAT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

-- Tabla productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
    estrellas FLOAT NOT NULL,
    stock INT NOT NULL
);

-- Relación N:M entre carritos y productos con atributo cantidad
CREATE TABLE carritos_productos (
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_carrito, id_producto),
    FOREIGN KEY (id_carrito) REFERENCES carritos(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Tabla metodos_pago
CREATE TABLE metodos_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metodo VARCHAR(100) NOT NULL
);

-- Tabla pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_metodo_pago INT NOT NULL,
    subtotal FLOAT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodos_pago(id)
);

-- Relación N:M entre pedidos y productos con atributo cantidad
CREATE TABLE pedidos_productos (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Tabla horas
CREATE TABLE horas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora VARCHAR(5) NOT NULL,
    es_laboral TINYINT(1) NOT NULL
);

-- Tabla servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    horas_requeridas INT NOT NULL
);

-- Tabla citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_manicurista INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha DATE NOT NULL,
    precio INT NOT NULL,
    FOREIGN KEY (id_manicurista) REFERENCES manicuristas(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

-- Relación N:M entre citas y servicios
CREATE TABLE citas_servicios (
    id_cita INT NOT NULL,
    id_servicio INT NOT NULL,
    PRIMARY KEY (id_cita, id_servicio),
    FOREIGN KEY (id_cita) REFERENCES citas(id),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id)
);

-- Relación N:M entre citas y horas
CREATE TABLE citas_horas (
    id_cita INT NOT NULL,
    id_hora INT NOT NULL,
    PRIMARY KEY (id_cita, id_hora),
    FOREIGN KEY (id_cita) REFERENCES citas(id),
    FOREIGN KEY (id_hora) REFERENCES horas(id)
);

-- Datos para la tabla de horas
INSERT INTO horas (id, hora, es_laboral) VALUES
(1, '09:00', 1),
(2, '09:15', 1),
(3, '09:30', 1),
(4, '09:45', 1),
(5, '10:00', 1),
(6, '10:15', 1),
(7, '10:30', 1),
(8, '10:45', 1),
(9, '11:00', 1),
(10, '11:15', 1),
(11, '11:30', 1),
(12, '11:45', 1),
(13, '12:00', 1),
(14, '12:15', 1),
(15, '12:30', 1),
(16, '12:45', 1),
(17, '13:00', 1),
(18, '13:15', 1),
(19, '13:30', 1),
(20, '13:45', 1),
(21, '14:00', 0),
(22, '14:15', 0),
(23, '14:30', 0),
(24, '14:45', 0),
(25, '15:00', 0),
(26, '15:15', 0),
(27, '15:30', 0),
(28, '15:45', 0),
(29, '16:00', 1),
(30, '16:15', 1),
(31, '16:30', 1),
(32, '16:45', 1),
(33, '17:00', 1),
(34, '17:15', 1),
(35, '17:30', 1),
(36, '17:45', 1),
(37, '18:00', 1),
(38, '18:15', 1),
(39, '18:30', 1),
(40, '18:45', 1),
(41, '19:00', 0);

-- Datos para la tabla de Administradores, Manicuristas y Clientes
INSERT INTO usuarios (id, url_imagen, nombre, apellidos, telefono, email, contrasena) VALUES
(1, '', 'Diana Lorena', 'Jimenez', '657487598', 'admin@diananails.com', 'abc123.'),
(2, '', 'Sofia', 'Garcia', '666666661', 'sgarcia@diananails.com', 'abc123.'),
(3, '', 'Ana', 'Ramírez', '666666662', 'nramirez@diananails.com', 'abc123.'),
(4, '', 'Camila', 'Lopez', '666666663', 'clopez@diananails.com', 'abc123.'),
(5, '', 'Cliente1', 'Apellido Cliente1', '666666664', 'cliente1@gmail.com', 'abc123.');

INSERT INTO administradores (id, dni) VALUES
(1, '84811274Q');

INSERT INTO manicuristas (id, dni) VALUES
(2, '12345678A'),
(3, '12345678B'),
(4, '12345678C');

INSERT INTO clientes (id, direccion_envio) VALUES
(5, '');

-- Datos para la tabal de Servicios
INSERT INTO servicios (id, url_imagen, nombre, precio, horas_requeridas) VALUES
(1, '', 'Manicura', 9, 1),
(2, '', 'Semipermanente básico', 17, 3),
(3, '', 'Semipermanente con decoración', 20, 4),
(4, '', 'Retiro de semipermanente', 5, 1),
(5, '', 'Arreglo de uña semipermanente', 2, 1),
(6, '', 'Uñas acrílicas', 30, 8),
(7, '', 'Uñas acrílicas extra largas', 35, 9),
(8, '', 'Relleno acrílico 1 solo color ', 25, 4),
(9, '', 'Relleno acrílico con decoración', 30, 6),
(10, '', 'Arreglo de uña acrílica rota', 5, 1),
(11, '', 'Retiro de acrílico ', 10, 2),
(12, '', 'Esmaltado manos tradicional', 12, 2),
(13, '', 'Refuerzo Kappi 1 solo color', 20, 4),
(14, '', 'Refuerzo Kappi con decoracion', 25, 6),
(15, '', 'Pedicura limpieza', 20, 3),
(16, '', 'Pedicura completa 1 solo color', 25, 4),
(17, '', 'Pedicura completa con decoración', 28, 5),
(18, '', 'Esmaltado de pies 1 solo color', 18, 2),
(19, '', 'Esmaltado de pies con decoración', 21, 3);

-- Datos para la tabla Metodos de pago
INSERT INTO metodos_pago (metodo) VALUES
("Pagar en local"),
("Tarjeta");