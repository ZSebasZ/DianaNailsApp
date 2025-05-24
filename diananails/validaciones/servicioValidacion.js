import { regex, estaVacio } from "../utils/regexCamposUtils";

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
        errores.nombre = "Nombre invalido, solo caracteres alfabeticos y maximo 50"
    }
    if (!estaVacio(valoresCampos.precio) && !regex.precioServicio.test(valoresCampos.precio)) {
        errores.precio = "Precio invalido, solo numeros enteros o decimales con maximo 2 decimales"
    }

    return errores

}

export const servicioValidacionOnBlur = (campo, valor) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "nombre":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.nombreServicio.test(valor)) {
                    error = "Nombre invalido, solo caracteres alfabeticos y maximo 50"
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
                    error = "Precio invalido, numeros enteros o decimales con maximo 2 decimales"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}