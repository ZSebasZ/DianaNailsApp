// Expresiones regulares reutilizables
export const regex = {
    //Regex para el login, registro y registro de manicuristas
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/,
    apellidos: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,100}$/,
    direccionEnvio: /^([\w\sáéíóúÁÉÍÓÚñÑ]+),\s*\d+(\s*,\s*[\w\s\d]+)*$/,
    telefono: /^[67]\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    dniNie: /^([XYZ]?)(\d{7,8})([A-Z])$/i,
    contrasena: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;"'<>,.?/\\|`~]).{6,}$/,

    //Regex para dar una opinion
    tituloOpinion: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/,
    descripcionOpinion: /^.{0,500}$/,

    //Regex para añadir un nuevo servicio
    nombreServicio: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/,
    precioServicio:  /^\d+(\.\d{2})?$/,

    //Regex para añadir un nuevo producto
    nombreProducto: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/,
    descripcionProducto: /^.{0,255}$/,
    precioProducto: /^\d+(\.\d{2})?$/,
    stockProducto: /^(0|[1-9]\d*)$/

};

// Función genérica para verificar si un campo está vacío
export function estaVacio(valorCampo) {
    return !valorCampo || valorCampo.trim() == '';
}
