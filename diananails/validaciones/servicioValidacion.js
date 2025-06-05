import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de servicio
export const validacionServicio = (valoresCampos) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    const camposObligatorios = [
        "nombre",
        "precio"
    ];

    camposObligatorios.forEach((campo) => {
        if (estaVacio(valoresCampos[campo])) {
            errores[campo] = textCampoObligatorio;
        }
    });

    if (!estaVacio(valoresCampos.nombre) && !regex.nombreServicio.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre inválido, solo carácteres alfabéticos y máximo 50"
    }
    if (!estaVacio(valoresCampos.precio) && !regex.precioServicio.test(valoresCampos.precio)) {
        errores.precio = "Precio inválido, solo números enteros o decimales con máximo 2 decimales"
    }

    return errores

}

// Funcion que se encarga de validar los campos del formulario de servicio al perder el foco
export const servicioValidacionOnBlur = (campo, valor) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "nombre":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.nombreServicio.test(valor)) {
                    error = "Nombre inválido, solo carácteres alfabéticos y máximo 50"
                } else {
                    error = 0
                }
            }
            break;
        case "precio":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.precioServicio.test(valor)) {
                    error = "Precio inválido, solo números enteros o decimales con máximo 2 decimales"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}