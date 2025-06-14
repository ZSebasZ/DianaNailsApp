-- Creacion de la base de datos
DROP DATABASE IF EXISTS diananailsapp;
CREATE DATABASE IF NOT EXISTS diananailsapp;

USE diananailsapp;

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255) NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla clientes (hereda de usuarios)
CREATE TABLE clientes (
    id INT PRIMARY KEY,
    direccion_envio VARCHAR(255) NOT NULL,
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
    url_imagen VARCHAR(255) NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
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
    total FLOAT NOT NULL,
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
    nombre VARCHAR(50) NOT NULL,
    precio FLOAT NOT NULL,
    horas_requeridas INT NOT NULL
);

-- Tabla citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_manicurista INT NOT NULL,
    id_cliente INT NOT NULL,
    fecha DATE NOT NULL,
    precio FLOAT NOT NULL,
    id_metodo_pago INT NOT NULL,
    FOREIGN KEY (id_manicurista) REFERENCES manicuristas(id),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodos_pago(id)
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

-- Triggers
-- Trigger para recalcular el subtotal después de INSERT o UPDATE o DELETE
DELIMITER //

CREATE TRIGGER recalcular_subtotal_carrito
AFTER INSERT ON carritos_productos
FOR EACH ROW
BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = NEW.id_carrito
    )
    WHERE id = NEW.id_carrito;
END;
//

CREATE TRIGGER recalcular_subtotal_carrito_update
AFTER UPDATE ON carritos_productos
FOR EACH ROW
BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = NEW.id_carrito
    )
    WHERE id = NEW.id_carrito;
END;
//

CREATE TRIGGER recalcular_subtotal_carrito_delete
AFTER DELETE ON carritos_productos
FOR EACH ROW
BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = OLD.id_carrito
    )
    WHERE id = OLD.id_carrito;
END;
//

-- Trigger que elimina un producto del carrito de compras si su cantidad es 0
CREATE TRIGGER eliminar_producto_carrito_si_cantidad_cero
AFTER UPDATE ON carritos_productos
FOR EACH ROW
BEGIN
    IF NEW.cantidad = 0 THEN
        DELETE FROM carritos_productos
        WHERE id_carrito = NEW.id_carrito
          AND id_producto = NEW.id_producto;
    END IF;
END;
//

-- Trigger que pasa los productos del carrito a la tabla pedidos_productos
-- y actualiza el stock de los productos
CREATE TRIGGER after_insert_pedido
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    -- Insertamos en pedidos_productos todos los productos que estaban en el carrito del cliente
    INSERT INTO pedidos_productos (id_pedido, id_producto, cantidad)
    SELECT 
        NEW.id,              -- El id del nuevo pedido insertado
        cp.id_producto,      -- El producto del carrito
        cp.cantidad          -- La cantidad del carrito
    FROM carritos_productos AS cp
    JOIN carritos AS c ON cp.id_carrito = c.id
    WHERE c.id_cliente = NEW.id_cliente;

    -- Actualizamos el stock de los productos en la tabla productos
    UPDATE productos AS p
    JOIN carritos_productos AS cp ON p.id = cp.id_producto
    JOIN carritos AS c ON cp.id_carrito = c.id
    SET p.stock = p.stock - cp.cantidad
    WHERE c.id_cliente = NEW.id_cliente;
END //


DELIMITER ;

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
(1, 'https://images.pexels.com/photos/3750717/pexels-photo-3750717.jpeg', 'Diana Lorena', 'Jimenez', '657487598', 'admin@diananails.com', '$2b$10$uKtb4f3mX1D.cJAEkFMAX.12SsrS.9gXzD5rfF9LfDxsE/UIejhRC'),
(2, 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sofia', 'Garcia', '666666661', 'sgarcia@diananails.com', '$2b$10$EwBOipKLzggTGWCuK8wsE.TupNQ2Lsy9P0sB9pkuBM7LhNuITDhOW'),
(3, 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600', 'Ana', 'Ramírez', '666666662', 'nramirez@diananails.com', '$2b$10$tTLMjeEUi.YqywDzKgV97OsApX5f4jttkm614tlzTZqn1TKYYeHlS'),
(4, 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Camila', 'Lopez', '666666663', 'clopez@diananails.com', '$2b$10$Q8cOFyf/lJ9HHQrt1MJHDuVSAZGR4qfQNvfy2ivNNsVfiHrt1DVdS'),
(5, 'https://images.pexels.com/photos/30068229/pexels-photo-30068229.jpeg', 'Sebastian', 'Jimenez', '666666664', 'cliente1@gmail.com', '$2b$10$/q9dDTDQj2aCgwjPxYA9euY3N14HZhUh4ceBtCLMB3Lp4JGr54RsW');

INSERT INTO administradores (id, dni) VALUES
(1, '84811274Q');

INSERT INTO manicuristas (id, dni) VALUES
(2, '12345678A'),
(3, '12345678B'),
(4, '12345678C');

INSERT INTO clientes (id, direccion_envio) VALUES
(5, 'Calle del paseo, 21');

INSERT INTO carritos (id_cliente, subtotal) VALUES 
(5, 0.00);

-- Datos para la tabal de Servicios
INSERT INTO servicios (id, nombre, precio, horas_requeridas) VALUES
(1, 'Manicura', 9.00, 1),
(2, 'Semipermanente básico', 17.00, 3),
(3, 'Semipermanente con decoración', 20.00, 4),
(4, 'Retiro de semipermanente', 5.00, 1),
(5, 'Arreglo de uña semipermanente', 2.00, 1),
(6, 'Uñas acrílicas', 30.00, 8),
(7, 'Uñas acrílicas extra largas', 35.00, 9),
(8, 'Relleno acrílico 1 solo color ', 25.00, 4),
(9, 'Relleno acrílico con decoración', 30.00, 6),
(10, 'Arreglo de uña acrílica rota', 5.00, 1),
(11, 'Retiro de acrílico ', 10.00, 2),
(12, 'Esmaltado manos tradicional', 12.00, 2),
(13, 'Refuerzo Kappi 1 solo color', 20.00, 4),
(14, 'Refuerzo Kappi con decoracion', 25.00, 6),
(15, 'Pedicura limpieza', 20.00, 3),
(16, 'Pedicura completa 1 solo color', 25.00, 4),
(17, 'Pedicura completa con decoración', 28.00, 5),
(18, 'Esmaltado de pies 1 solo color', 18.00, 2),
(19, 'Esmaltado de pies con decoración', 21.00, 3);

-- Datos para la tabla Metodos de pago
INSERT INTO metodos_pago (metodo) VALUES
("Pagar en local"),
("Tarjeta"),
("Efectivo (contra entrega)");

-- Datos para la tabla Productos
INSERT INTO productos (url_imagen, nombre, descripcion, precio, stock) VALUES
('https://upsalacosmetic.com/wp-content/uploads/2021/12/H095-8.jpg', 'Esmalte Rosa Pastel', 'Esmalte de uñas color rosa pastel, larga duración.', 5.99, 3),
('https://seminails.com/5025-large_default/esmalte-permanente-wemmi-15-ml-rojo-clasico.jpg', 'Esmalte Rojo Clásico', 'Esmalte de uñas color rojo intenso, secado rápido.', 6.50, 25),
('https://imbeauty.es/cdn/shop/files/16176-thickbox_default.png?v=1690878525&width=1445', 'Kit Básico de Manicura', 'Set de manicura con cortaúñas, lima y empujador de cutículas.', 12.00, 15),
('https://www.delauz.es/documents/10180/12111/4005808584864_G.jpg', 'Crema Hidratante de Manos', 'Crema nutritiva para manos suaves y protegidas.', 8.50, 40),
('https://www.clipshair.es/17066-large_default/removedor-de-cuticula-en-gel-120-ml-masg.jpg', 'Removedor de Cutículas', 'Gel removedor de cutículas para un acabado profesional.', 4.75, 20),
('https://www.bysmaquillaje.es/media/catalog/product/l/i/limes-ongles-x5.jpg', 'Limas de Uñas (Pack x5)', 'Juego de limas profesionales para manicura y pedicura.', 3.99, 50),
('https://shop.farmariba.com/4809-large_default/crema-bals%C3%A1mica-relajante-pies-cansados-saltratos-50-ml-laboratorios-vi%C3%B1as.jpg', 'Baño Relajante para Pies', 'Sales minerales para baño relajante de pies.', 7.20, 18),
('https://veki.es/2743-thickbox_default/snb-kit-de-pedicura-profesional.webp', 'Kit Pedicura Completo', 'Set profesional de pedicura con piedra pómez, cortaúñas y separadores.', 14.99, 10),
('https://fiduciamakeupbo.com/wp-content/uploads/2024/04/vogue-base-fortalecedora1234.jpg', 'Base Fortalecedora de Uñas', 'Protector y fortalecedor de uñas antes del esmalte.', 6.80, 22),
('https://www.druni.es/media/catalog/product/5/6/5637.jpg', 'Esmalte en Gel UV', 'Esmalte semipermanente para uñas con acabado brillante.', 9.99, 0);

-- Datos para la tabla Opiniones
INSERT INTO opiniones (id_cliente, titulo, descripcion, estrellas, fecha)
VALUES
(5, 'Servicio deficiente', 
'La atención fue lenta y no me gustó el resultado de la manicura. El esmalte se despegó al segundo día y no parecía profesional.', 
2, '2025-06-01'),

(5, 'Aceptable pero mejorable', 
'El salón está limpio y el personal es amable, pero la pedicura no duró mucho. Creo que podrían mejorar la calidad de los productos.', 
3, '2025-06-03'),

(5, 'Muy buen servicio', 
'Me encantó el ambiente del salón, relajante y acogedor. La profesional que me atendió fue muy detallista con la manicura. Volvería.', 
4, '2025-06-05'),

(5, 'Excelente experiencia', 
'Desde que entré, el trato fue impecable. Me hicieron una pedicura perfecta, y me ofrecieron té mientras esperaba. ¡Muy recomendado!', 
5, '2025-06-10');

CREATE VIEW `vmanicuristas` 
AS 
select `u`.`id` AS `id`,concat(`u`.`nombre`,' ',`u`.`apellidos`) AS `nombre_manicurista`,`u`.`url_imagen` AS `url_imagen` 
from (`manicuristas` `m` 
join `usuarios` `u` on((`u`.`id` = `m`.`id`)))