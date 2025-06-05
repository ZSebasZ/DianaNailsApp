import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de producto
export const validacionProducto = (valoresCampos) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    const camposObligatorios = [
        "imagen",
        "nombre",
        "descripcion",
        "precio",
        "stock",
    ];
    //console.log("valores campos antes del foreach:", valoresCampos)
    camposObligatorios.forEach((campo) => {
        //console.log(campo)
        if (estaVacio(valoresCampos[campo])) {
            if (campo == "imagen") {
                //console.log(valoresCampos[campo])
                errores[campo] = "La imagen del producto es obligatoria"
            } else {
                errores[campo] = textCampoObligatorio;
            }
        }
    });

    //console.log("ternmina bucle")
    if (!estaVacio(valoresCampos.nombre) && !regex.nombreProducto.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre inválido, solo carácteres alfabéticos y máximo 50"
    }
    if (!estaVacio(valoresCampos.descripcion) && !regex.descripcionProducto.test(valoresCampos.descripcion)) {
        errores.descripcion = "Descripción inválida, máximo 255 carácteres"
    }
    if (!estaVacio(valoresCampos.precio) && !regex.precioProducto.test(valoresCampos.precio)) {
        errores.precio = "Precio inválido, solo números enteros o decimales con máximo 2 decimales"
    }
    if (!estaVacio(valoresCampos.stock) && !regex.stockProducto.test(valoresCampos.stock)) {
        errores.stock = "Stock inválido, solo números enteros"
    }

    //console.log(errores)

    return errores

}

// Funcion que se encarga de validar los campos del formulario de producto al perder el foco
export const productoValidacionOnBlur = (campo, valor) => {

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
        case "descripcion":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.descripcionProducto.test(valor)) {
                    error = "Descripción inválida, máximo 255 carácteres"
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
        case "stock":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.stockProducto.test(valor)) {
                    error = "Stock inválido, solo números enteros"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}