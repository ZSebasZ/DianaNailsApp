import express from "express"; //Importamos la libreria 'express'
import cors from "cors"; //Importamos la libreria 'cors'
import dotenv from "dotenv"; //Importamos la libreria 'dotenv'
import connection from "./db/connection.js"; //Importamos nuestra conexion

//Cargamos las variables de entorno
dotenv.config();

//Creamos la app de Express
const app = express();

app.use(cors()); //Permitimos peticiones desde el frontend
app.use(express.json()); //Permitimos recibir datos en JSON

//Puerto del servidor
const PORT = process.env.PORT;

//Ruta de prueba para testear desde el navegador
app.get("/", (req, res) => {
    res.send("Backend funcionando")
})

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log("Servidor escuchando en localhost:3307")
})