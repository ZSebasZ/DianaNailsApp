import express from "express"; //Importamos la libreria 'express'
import {getCitasCliente, deleteCitaCliente, getCitasClientes, getCitasClientesPorManicurista} from "./../controllers/citasClienteController.js"

//Creamos el objeto Router para establecer las rutas que vamos a usar
const router = express.Router()

//Creamos la ruta para la OBTENCION de las CITAS de un CLIENTE
router.get("/get-citas-cliente/:idCliente", getCitasCliente)

//Creamos la ruta para el BORRADO(cancelacion) de la CITA de un CLIENTE
router.delete("/delete-cita-cliente/:idCliente/:idCita", deleteCitaCliente)

//Creamos la ruta para la OBTENCION de las CITAS de todos los CLIENTES
router.post("/get-citas-clientes", getCitasClientes)

//Creamos la ruta para la OBTENCION de las CITAS asignada a una MANICURISTA
router.post("/get-citas-clientes-manicurista", getCitasClientesPorManicurista)

export default router;