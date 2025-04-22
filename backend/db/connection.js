import mysql from "mysql2"; //Importamos la libreria 'mysql2'
import dotenv from "dotenv"; //Importamos la libreria 'dotenv'

//Cargamos las variables de entorno
dotenv.config();

//Creamos la conexion a la base de datos con las varibales del archivo .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

//Realizamos la conexion
connection.connect((error) => {
    if(error) {
        console.error("Error al conectar a la base de datos: " + error)
    } else {
        console.log("Conexion exitosa")
    }
})

export default connection;