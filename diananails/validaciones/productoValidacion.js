import { regex, estaVacio } from "../utils/regexCamposUtils";

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
        errores.nombre = "Nombre invalido, solo caracteres alfabeticos y maximo 50"
    }
    if (!estaVacio(valoresCampos.descripcion) && !regex.descripcionProducto.test(valoresCampos.descripcion)) {
        errores.descripcion = "Descripcion invalida, maximo 255 caracteres"
    }
    if (!estaVacio(valoresCampos.precio) && !regex.precioProducto.test(valoresCampos.precio)) {
        errores.precio = "Precio invalido, solo numeros enteros o decimales con maximo 2 decimales"
    }
    if (!estaVacio(valoresCampos.stock) && !regex.stockProducto.test(valoresCampos.stock)) {
        errores.stock = "Stock invalido, solo numeros enteros"
    }

    //console.log(errores)

    return errores

}

export const productoValidacionOnBlur = (campo, valor) => {

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
        case "descripcion":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.descripcionProducto.test(valor)) {
                    error = "Descripcion invalida, maximo 255 caracteres"
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
        case "stock":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.stockProducto.test(valor)) {
                    error = "Stock invalido, solo numeros enteros"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}