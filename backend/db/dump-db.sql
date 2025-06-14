DROP DATABASE IF EXISTS `diananailsapp`;
CREATE DATABASE  IF NOT EXISTS `diananailsapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `diananailsapp`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: diananailsapp
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id` int NOT NULL,
  `dni` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,'84811274Q');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `subtotal` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,5,0);
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos_productos`
--

DROP TABLE IF EXISTS `carritos_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos_productos` (
  `id_carrito` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_carrito`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `carritos_productos_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id`),
  CONSTRAINT `carritos_productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos_productos`
--

LOCK TABLES `carritos_productos` WRITE;
/*!40000 ALTER TABLE `carritos_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos_productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recalcular_subtotal_carrito` AFTER INSERT ON `carritos_productos` FOR EACH ROW BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = NEW.id_carrito
    )
    WHERE id = NEW.id_carrito;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recalcular_subtotal_carrito_update` AFTER UPDATE ON `carritos_productos` FOR EACH ROW BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = NEW.id_carrito
    )
    WHERE id = NEW.id_carrito;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `eliminar_producto_carrito_si_cantidad_cero` AFTER UPDATE ON `carritos_productos` FOR EACH ROW BEGIN
    IF NEW.cantidad = 0 THEN
        DELETE FROM carritos_productos
        WHERE id_carrito = NEW.id_carrito
          AND id_producto = NEW.id_producto;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recalcular_subtotal_carrito_delete` AFTER DELETE ON `carritos_productos` FOR EACH ROW BEGIN
    UPDATE carritos
    SET subtotal = (
        SELECT IFNULL(SUM(cp.cantidad * p.precio), 0)
        FROM carritos_productos AS cp
        JOIN productos AS p ON cp.id_producto = p.id
        WHERE cp.id_carrito = OLD.id_carrito
    )
    WHERE id = OLD.id_carrito;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_manicurista` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha` date NOT NULL,
  `precio` float NOT NULL,
  `id_metodo_pago` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_manicurista` (`id_manicurista`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_manicurista`) REFERENCES `manicuristas` (`id`),
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodos_pago` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas_horas`
--

DROP TABLE IF EXISTS `citas_horas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas_horas` (
  `id_cita` int NOT NULL,
  `id_hora` int NOT NULL,
  PRIMARY KEY (`id_cita`,`id_hora`),
  KEY `id_hora` (`id_hora`),
  CONSTRAINT `citas_horas_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id`),
  CONSTRAINT `citas_horas_ibfk_2` FOREIGN KEY (`id_hora`) REFERENCES `horas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas_horas`
--

LOCK TABLES `citas_horas` WRITE;
/*!40000 ALTER TABLE `citas_horas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas_horas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas_servicios`
--

DROP TABLE IF EXISTS `citas_servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas_servicios` (
  `id_cita` int NOT NULL,
  `id_servicio` int NOT NULL,
  PRIMARY KEY (`id_cita`,`id_servicio`),
  KEY `id_servicio` (`id_servicio`),
  CONSTRAINT `citas_servicios_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id`),
  CONSTRAINT `citas_servicios_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas_servicios`
--

LOCK TABLES `citas_servicios` WRITE;
/*!40000 ALTER TABLE `citas_servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas_servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `direccion_envio` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (5,'Calle del paseo, 21');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horas`
--

DROP TABLE IF EXISTS `horas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hora` varchar(5) NOT NULL,
  `es_laboral` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horas`
--

LOCK TABLES `horas` WRITE;
/*!40000 ALTER TABLE `horas` DISABLE KEYS */;
INSERT INTO `horas` VALUES (1,'09:00',1),(2,'09:15',1),(3,'09:30',1),(4,'09:45',1),(5,'10:00',1),(6,'10:15',1),(7,'10:30',1),(8,'10:45',1),(9,'11:00',1),(10,'11:15',1),(11,'11:30',1),(12,'11:45',1),(13,'12:00',1),(14,'12:15',1),(15,'12:30',1),(16,'12:45',1),(17,'13:00',1),(18,'13:15',1),(19,'13:30',1),(20,'13:45',1),(21,'14:00',0),(22,'14:15',0),(23,'14:30',0),(24,'14:45',0),(25,'15:00',0),(26,'15:15',0),(27,'15:30',0),(28,'15:45',0),(29,'16:00',1),(30,'16:15',1),(31,'16:30',1),(32,'16:45',1),(33,'17:00',1),(34,'17:15',1),(35,'17:30',1),(36,'17:45',1),(37,'18:00',1),(38,'18:15',1),(39,'18:30',1),(40,'18:45',1),(41,'19:00',0);
/*!40000 ALTER TABLE `horas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manicuristas`
--

DROP TABLE IF EXISTS `manicuristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manicuristas` (
  `id` int NOT NULL,
  `dni` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  CONSTRAINT `manicuristas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manicuristas`
--

LOCK TABLES `manicuristas` WRITE;
/*!40000 ALTER TABLE `manicuristas` DISABLE KEYS */;
INSERT INTO `manicuristas` VALUES (2,'12345678A'),(3,'12345678B'),(4,'12345678C');
/*!40000 ALTER TABLE `manicuristas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodos_pago`
--

DROP TABLE IF EXISTS `metodos_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodos_pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `metodo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodos_pago`
--

LOCK TABLES `metodos_pago` WRITE;
/*!40000 ALTER TABLE `metodos_pago` DISABLE KEYS */;
INSERT INTO `metodos_pago` VALUES (1,'Pagar en local'),(2,'Tarjeta'),(3,'Efectivo (contra entrega)');
/*!40000 ALTER TABLE `metodos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opiniones`
--

DROP TABLE IF EXISTS `opiniones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opiniones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `estrellas` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `opiniones_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opiniones`
--

LOCK TABLES `opiniones` WRITE;
/*!40000 ALTER TABLE `opiniones` DISABLE KEYS */;
INSERT INTO `opiniones` VALUES (1,5,'Servicio deficiente','La atención fue lenta y no me gustó el resultado de la manicura. El esmalte se despegó al segundo día y no parecía profesional.',2,'2025-06-01'),(2,5,'Aceptable pero mejorable','El salón está limpio y el personal es amable, pero la pedicura no duró mucho. Creo que podrían mejorar la calidad de los productos.',3,'2025-06-03'),(3,5,'Muy buen servicio','Me encantó el ambiente del salón, relajante y acogedor. La profesional que me atendió fue muy detallista con la manicura. Volvería.',4,'2025-06-05'),(4,5,'Excelente experiencia','Desde que entré, el trato fue impecable. Me hicieron una pedicura perfecta, y me ofrecieron té mientras esperaba. ¡Muy recomendado!',5,'2025-06-10');
/*!40000 ALTER TABLE `opiniones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_metodo_pago` int NOT NULL,
  `total` float NOT NULL,
  `estado` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodos_pago` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_pedido` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN
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
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pedidos_productos`
--

DROP TABLE IF EXISTS `pedidos_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_productos` (
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id_pedido`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `pedidos_productos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `pedidos_productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_productos`
--

LOCK TABLES `pedidos_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` float NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'https://upsalacosmetic.com/wp-content/uploads/2021/12/H095-8.jpg','Esmalte Rosa Pastel','Esmalte de uñas color rosa pastel, larga duración.',5.99,3),(2,'https://seminails.com/5025-large_default/esmalte-permanente-wemmi-15-ml-rojo-clasico.jpg','Esmalte Rojo Clásico','Esmalte de uñas color rojo intenso, secado rápido.',6.5,25),(3,'https://imbeauty.es/cdn/shop/files/16176-thickbox_default.png?v=1690878525&width=1445','Kit Básico de Manicura','Set de manicura con cortaúñas, lima y empujador de cutículas.',12,15),(4,'https://www.delauz.es/documents/10180/12111/4005808584864_G.jpg','Crema Hidratante de Manos','Crema nutritiva para manos suaves y protegidas.',8.5,40),(5,'https://www.clipshair.es/17066-large_default/removedor-de-cuticula-en-gel-120-ml-masg.jpg','Removedor de Cutículas','Gel removedor de cutículas para un acabado profesional.',4.75,20),(6,'https://www.bysmaquillaje.es/media/catalog/product/l/i/limes-ongles-x5.jpg','Limas de Uñas (Pack x5)','Juego de limas profesionales para manicura y pedicura.',3.99,50),(7,'https://shop.farmariba.com/4809-large_default/crema-bals%C3%A1mica-relajante-pies-cansados-saltratos-50-ml-laboratorios-vi%C3%B1as.jpg','Baño Relajante para Pies','Sales minerales para baño relajante de pies.',7.2,18),(8,'https://veki.es/2743-thickbox_default/snb-kit-de-pedicura-profesional.webp','Kit Pedicura Completo','Set profesional de pedicura con piedra pómez, cortaúñas y separadores.',14.99,10),(9,'https://fiduciamakeupbo.com/wp-content/uploads/2024/04/vogue-base-fortalecedora1234.jpg','Base Fortalecedora de Uñas','Protector y fortalecedor de uñas antes del esmalte.',6.8,22),(10,'https://www.druni.es/media/catalog/product/5/6/5637.jpg','Esmalte en Gel UV','Esmalte semipermanente para uñas con acabado brillante.',9.99,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `horas_requeridas` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Manicura',9,1),(2,'Semipermanente básico',17,3),(3,'Semipermanente con decoración',20,4),(4,'Retiro de semipermanente',5,1),(5,'Arreglo de uña semipermanente',2,1),(6,'Uñas acrílicas',30,8),(7,'Uñas acrílicas extra largas',35,9),(8,'Relleno acrílico 1 solo color ',25,4),(9,'Relleno acrílico con decoración',30,6),(10,'Arreglo de uña acrílica rota',5,1),(11,'Retiro de acrílico ',10,2),(12,'Esmaltado manos tradicional',12,2),(13,'Refuerzo Kappi 1 solo color',20,4),(14,'Refuerzo Kappi con decoracion',25,6),(15,'Pedicura limpieza',20,3),(16,'Pedicura completa 1 solo color',25,4),(17,'Pedicura completa con decoración',28,5),(18,'Esmaltado de pies 1 solo color',18,2),(19,'Esmaltado de pies con decoración',21,3);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url_imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'https://images.pexels.com/photos/3750717/pexels-photo-3750717.jpeg','Diana Lorena','Jimenez','657487598','admin@diananails.com','$2b$10$uKtb4f3mX1D.cJAEkFMAX.12SsrS.9gXzD5rfF9LfDxsE/UIejhRC'),(2,'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600','Sofia','Garcia','666666661','sgarcia@diananails.com','$2b$10$EwBOipKLzggTGWCuK8wsE.TupNQ2Lsy9P0sB9pkuBM7LhNuITDhOW'),(3,'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600','Ana','Ramírez','666666662','nramirez@diananails.com','$2b$10$tTLMjeEUi.YqywDzKgV97OsApX5f4jttkm614tlzTZqn1TKYYeHlS'),(4,'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2','Camila','Lopez','666666663','clopez@diananails.com','$2b$10$Q8cOFyf/lJ9HHQrt1MJHDuVSAZGR4qfQNvfy2ivNNsVfiHrt1DVdS'),(5,'https://images.pexels.com/photos/30068229/pexels-photo-30068229.jpeg','Sebastian','Jimenez','666666664','cliente1@gmail.com','$2b$10$/q9dDTDQj2aCgwjPxYA9euY3N14HZhUh4ceBtCLMB3Lp4JGr54RsW');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vmanicuristas`
--

DROP TABLE IF EXISTS `vmanicuristas`;
/*!50001 DROP VIEW IF EXISTS `vmanicuristas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vmanicuristas` AS SELECT 
 1 AS `id`,
 1 AS `nombre_manicurista`,
 1 AS `url_imagen`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'diananailsapp'
--

--
-- Dumping routines for database 'diananailsapp'
--

--
-- Final view structure for view `vmanicuristas`
--

/*!50001 DROP VIEW IF EXISTS `vmanicuristas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vmanicuristas` AS select `u`.`id` AS `id`,concat(`u`.`nombre`,' ',`u`.`apellidos`) AS `nombre_manicurista`,`u`.`url_imagen` AS `url_imagen` from (`manicuristas` `m` join `usuarios` `u` on((`u`.`id` = `m`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13 21:57:16
