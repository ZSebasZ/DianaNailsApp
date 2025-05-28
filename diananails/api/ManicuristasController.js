import { api } from "./ApiService";

// Funcion para obtener los manicuristas de la API
export const obtenerManicuristasAdmin = async (admin) => {
    try {
        const manicuristas = await api("POST", "get-manicuristas", {idAdmin: admin});
        return manicuristas;
    } catch (error) {
        throw error;
    }
};

// Funcion para insertar una nueva manicurista con la API
export const nuevaManicurista = async (imagen, dniNie, nombre, apellidos, telefono, email, contrasena) => {
    try {
        const nuevaManicurista = await api("POST", "nueva-manicurista", { url_imagen: imagen, nombre: nombre, apellidos: apellidos, telefono: telefono, email: email, contrasena: contrasena, dni: dniNie } );
        return nuevaManicurista;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los datos de una manicurista
export const obtenerManucurista = async (manicurista) => {
    try {
        const datosManicurista = await api("POST", "get-manicurista", { idManicurista: manicurista } );
        return datosManicurista;
    } catch (error) {
        throw error;
    }
};

// Funcion para actualizar los datos de una manicurista
export const actualizarManicurista = async (manicurista, imagen, nombre, apellidos, telefono) => {
    try {
        const manicuristaActualizada = await api("PUT", "update-manicurista", { idManicurista: manicurista, url_imagen: imagen, nombre: nombre, apellidos: apellidos, telefono: telefono } );
        return manicuristaActualizada;
    } catch (error) {
        throw error;
    }
};
