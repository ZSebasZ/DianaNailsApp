import { api } from "./ApiService";

const IMGUR_CLIENT_ID = "fe29c6d3f1dde1a";

export const obtenerProductosTienda = async (carrito) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productos = await api("GET", `get-productos?carrito=${carrito}`,); // Llamamos al servicio
        return productos;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerProductosAdmin = async (admin) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productos = await api("POST", `get-productos-admin`, { idAdmin: admin }); // Llamamos al servicio
        return productos;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerProductoDetalles = async (carrito, producto) => {
    try {
        //console.log(`get-productos?carrito=${carrito}`)
        const productoDetalles = await api("GET", `get-producto-detalles?carrito=${carrito}&producto=${producto}`,); // Llamamos al servicio
        return productoDetalles;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const nuevoProducto = async (imagen, nombre, descripcion, precio, stock) => {
    try {
        //console.log({ url_imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock })
        const nuevoProducto = await api("POST", "nuevo-producto", { url_imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock }); // Llamamos al servicio
        return nuevoProducto;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const obtenerProducto = async (producto) => {
    try {
        const datosProducto = await api("POST", "get-producto", {idProducto: producto}); // Llamamos al servicio
        return datosProducto;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const actualizarProducto = async (producto, imagen, nombre, descripcion, precio, stock) => {
    try {
        const productoActualizado = await api("PUT", "update-producto", {idProducto: producto, url_imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock}); // Llamamos al servicio
        return productoActualizado;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};

export const subirImagenImgur = async (datos) => {
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
                console.error("Error al subir:", data);
                console.log("Error al subir", data.data.error);
            }
        }

        return urlImagen;  // Devolvemos los datos para ser usados por las pantallas
    } catch (error) {
        throw error;
    }
};
