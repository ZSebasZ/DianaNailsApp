import express from "express"; //Importamos la libreria 'express'
import cors from "cors"; //Importamos la libreria 'cors'
import dotenv from "dotenv"; //Importamos la libreria 'dotenv'
import connection from "./db/connection.js"; //Importamos nuestra conexion
import authRoutes from "./routes/auth.js"; //Importamos la ruta de LOGIN y REGISTER
import serviciosRoutes from "./routes/servicios.js"; //Importamos la ruta de SERVICIOS
import citaRoutes from "./routes/cita.js" //Importamos la ruta de CITA
import perfilRoutes from "./routes/perfil.js" //Importamos la ruta de PERFIL
import citasClienteRoutes from "./routes/citasCliente.js" //Importamos la ruta de CITAS_CLIENTES
import opinionesRoutes from "./routes/opiniones.js" //Importamos la ruta de OPINIONES
import productosRoutes from "./routes/productos.js" //Importamos la ruta de PRODUCTOS
import carritoRoutes from "./routes/carrito.js" //Importamos la ruta de CARRITO
import pedidoRoutes from "./routes/pedido.js" //Importamos la ruta de PEDIDO
import manicuristasRoutes from "./routes/manicuristas.js" //Importamos la ruta de MANICURISTAS


//Cargamos las variables de entorno
dotenv.config();

//Creamos la app de Express
const app = express();

app.use(cors()); //Permitimos peticiones desde el frontend
app.use(express.json()); //Permitimos recibir datos en JSON

//RUTAS
//Usamos la ruta de LOGIN y REGISTER-CLIENTE
app.use("/api", authRoutes);

//Usamos la ruta de SERVICIOS
app.use("/api", serviciosRoutes);

//Usamos la ruta de CITA
app.use("/api", citaRoutes);

//Usamos la ruta de PERFIL
app.use("/api", perfilRoutes);

//Usamos la ruta de CITAS_CLIENTES
app.use("/api", citasClienteRoutes);

//Usamos la ruta de OPINIONES
app.use("/api", opinionesRoutes);

//Usamos la ruta de PRODUCTOS
app.use("/api", productosRoutes);

//Usamos la ruta de CARRITO
app.use("/api", carritoRoutes);

//Usamos la ruta de PEDIDO
app.use("/api", pedidoRoutes);

//Usamos la ruta de MANICURISTAS
app.use("/api", manicuristasRoutes);

//Puerto del servidor
const PORT = process.env.PORT;

//Ruta de prueba para testear desde el navegador
app.get("/", (req, res) => {
    res.send("Backend funcionando")
})

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log("Servidor escuchando en localhost:" + PORT)
})