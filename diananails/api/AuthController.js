import { api } from "./ApiService";

const IMGUR_CLIENT_ID = "fe29c6d3f1dde1a"; // KEY para subir imagenes a Imgur

// Funcion para registrar un cliente con la API
export const registroCliente = async (datos) => {
    try {
        const clienteRegistrado = await api("POST", "register-cliente", datos);
        return clienteRegistrado;
    } catch (error) {
        throw error;
    }
};

// Funciones para loguear un cliente con la API
export const loginCliente = async (datos) => {
    try {
        const clienteLogueado = await api("POST", "login", datos);
        return clienteLogueado;
    } catch (error) {
        throw error;
    }
};

// Funcion para subir la foto del usuario y actualizarla
export const fotoUsuario = async (datos) => {
    try {
        let urlImagen = null

        if (datos.imagenBase64 != null) {
            const respuesta = await fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: datos.imagenBase64,
                    type: "base64",
                }),
            });

            const data = await respuesta.json();

            if (data.success) {
                //console.log("Imagen subida", data.data.link);
                urlImagen = data.data.link
            } else {
                //console.error("Error al subir:", data);
                //console.log("Error al subir", data.data.error);
            }
        }

        const fotoUsuario = await api("POST", "update-foto-usuario", {idUsuario: datos.idUsuario, urlImagen: urlImagen}); // Llamamos al servicio
        return fotoUsuario;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los datos del perfil del usuario
export const datosPerfilUsuario = async (datos) => {
    try {
        const datosPerfil = await api("POST", "datos-perfil", datos);
        return datosPerfil;
    } catch (error) {
        throw error;
    }
};

export const updateDatosUsuario = async (id, datos) => {
    try {
        const datosUsuarioUpdate = await api("PUT", "update-datos-pers-cliente/" + id, datos); // Llamamos al servicio
        return datosUsuarioUpdate;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const eliminarCuentaCliente = async (cliente) => {
    try {
        const cuentaEliminada = await api("DELETE", "delete-cliente", {idCliente: cliente}); // Llamamos al servicio
        return cuentaEliminada;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

