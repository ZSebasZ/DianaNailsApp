import { api } from "./ApiService";

export const obtenerManicuristasAdmin = async (admin) => {
    try {
        const manicuristas = await api("POST", "get-manicuristas", {idAdmin: admin}); // Llamamos al servicio
        return manicuristas;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const nuevaManicurista = async (imagen, dniNie, nombre, apellidos, telefono, email, contrasena) => {
    try {
        const nuevaManicurista = await api("POST", "nueva-manicurista", { url_imagen: imagen, nombre: nombre, apellidos: apellidos, telefono: telefono, email: email, contrasena: contrasena, dni: dniNie } ); // Llamamos al servicio
        return nuevaManicurista;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerManucurista = async (manicurista) => {
    try {
        const datosManicurista = await api("POST", "get-manicurista", { idManicurista: manicurista } ); // Llamamos al servicio
        return datosManicurista;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const actualizarManicurista = async (manicurista, imagen, nombre, apellidos, telefono) => {
    try {
        //console.log({ idManicurista: manicurista, url_imagen: imagen, nombre: nombre, apellidos: apellidos, telefono: telefono })
        const manicuristaActualizada = await api("PUT", "update-manicurista", { idManicurista: manicurista, url_imagen: imagen, nombre: nombre, apellidos: apellidos, telefono: telefono } ); // Llamamos al servicio
        return manicuristaActualizada;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};
