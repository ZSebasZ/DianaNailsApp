import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de actualizacion de datos personales
export const validacionUpdateDatos = (valoresCampos, tipoUsuario) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    let camposObligatorios = []

    if (tipoUsuario == 2) {
        camposObligatorios = [
            "nombre",
            "apellidos",
            "telefono",
            "direccionEnvio"
        ];
    } else {
        camposObligatorios = [
            "nombre",
            "apellidos",
            "telefono",
        ];
    }




    camposObligatorios.forEach((campo) => {
        if (estaVacio(valoresCampos[campo])) {
            errores[campo] = textCampoObligatorio;
        }
    });

    if (!estaVacio(valoresCampos.nombre) && !regex.nombre.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre inválido, solo carácteres alfabéticos y 50 como máximo"
    }
    if (!estaVacio(valoresCampos.apellidos) && !regex.apellidos.test(valoresCampos.apellidos)) {
        errores.apellidos = "Apellidos inválidos, solo carácteres alfabéticos y 100 como máximo"
    }
    if (!estaVacio(valoresCampos.telefono) && !regex.telefono.test(valoresCampos.telefono)) {
        errores.telefono = "Teléfono inválido, solo números telefónicos de España"
    }
    if (tipoUsuario === 2) {
        if (!estaVacio(valoresCampos.direccionEnvio) && !regex.direccionEnvio.test(valoresCampos.direccionEnvio)) {
            errores.direccionEnvio = "Dirección de envio inválida. Usa: calle, número, (opcional: detalles)"
        }
    }


    return errores


}

// Funcion que se encarga de validar los campos del formulario de actualizacion de datos personales al perder el foco
export const updateDatosValidacionOnBlur = (campo, valor) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "nombre":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.nombre.test(valor)) {
                    error = "Nombre inválido, solo carácteres alfabéticos y 50 como máximo"
                } else {
                    error = 0
                }
            }
            break;
        case "apellidos":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.apellidos.test(valor)) {
                    error = "Apellidos inválidos, solo carácteres alfabéticos y 100 como máximo"
                } else {
                    error = 0
                }
            }
            break;
        case "telefono":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.telefono.test(valor)) {
                    error = "Teléfono inválido, solo números telefónicos de España"
                } else {
                    error = 0
                }
            }
            break;
        case "direccionEnvio":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.direccionEnvio.test(valor)) {
                    error = "Dirección de envio inválida. Usa: calle, número, (opcional: detalles)"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}