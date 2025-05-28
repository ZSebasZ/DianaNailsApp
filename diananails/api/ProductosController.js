import { api } from "./ApiService";

const IMGUR_CLIENT_ID = "fe29c6d3f1dde1a";

// Funcion para obtener los productos para la tienda de la API
export const obtenerProductosTienda = async (carrito) => {
    try {
        const productos = await api("GET", `get-productos?carrito=${carrito}`,);
        return productos;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los productos para el admin con la API
export const obtenerProductosAdmin = async (admin) => {
    try {
        const productos = await api("POST", `get-productos-admin`, { idAdmin: admin });
        return productos;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los detalles de un producto con la API
export const obtenerProductoDetalles = async (carrito, producto) => {
    try {
        const productoDetalles = await api("GET", `get-producto-detalles?carrito=${carrito}&producto=${producto}`,);
        return productoDetalles;
    } catch (error) {
        throw error;
    }
};

// Funcion para insertar un nuevo producto con la API
export const nuevoProducto = async (imagen, nombre, descripcion, precio, stock) => {
    try {
        const nuevoProducto = await api("POST", "nuevo-producto", { url_imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock });
        return nuevoProducto;
    } catch (error) {
        throw error;
    }
};

// Funcion para obtener los detalles de un producto con la API
export const obtenerProducto = async (producto) => {
    try {
        const datosProducto = await api("POST", "get-producto", {idProducto: producto});
        return datosProducto;
    } catch (error) {
        throw error;
    }
};

// Funcion para actualizar un producto con la API
export const actualizarProducto = async (producto, imagen, nombre, descripcion, precio, stock) => {
    try {
        const productoActualizado = await api("PUT", "update-producto", {idProducto: producto, url_imagen: imagen, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock});
        return productoActualizado;
    } catch (error) {
        throw error;
    }
};

// Funcion para subir una imagen a imgur
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
                urlImagen = data.data.link
            } else {
                console.error("Error al subir:", data);
                console.log("Error al subir", data.data.error);
            }
        }

        return urlImagen;
    } catch (error) {
        throw error;
    }
};
