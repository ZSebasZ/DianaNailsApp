import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de manicurista
export const validacionManicurista = (valoresCampos, esEdicion = false) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    let camposObligatorios = []

    if (esEdicion) {
        camposObligatorios = [
            "imagen",
            "dniNie",
            "nombre",
            "apellidos",
            "telefono",
            "email",
        ];
    } else {
        camposObligatorios = [
            "imagen",
            "dniNie",
            "nombre",
            "apellidos",
            "telefono",
            "email",
            "contrasena",
            "confirmarContrasena",
        ];
    }

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

    if (!estaVacio(valoresCampos.dniNie) && !regex.dniNie.test(valoresCampos.dniNie)) {
        errores.dniNie = "DNI/NIE inválido, solo una letra inicial en caso de NIE, seguido de 8 números y una letra final"
    }
    if (!estaVacio(valoresCampos.nombre) && !regex.nombre.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre inválido, solo carácteres alfabéticos y 50 como máximo"
    }
    if (!estaVacio(valoresCampos.apellidos) && !regex.apellidos.test(valoresCampos.apellidos)) {
        errores.apellidos = "Apellidos inválidos, solo carácteres alfabéticos y 100 como máximo"
    }
    if (!estaVacio(valoresCampos.telefono) && !regex.telefono.test(valoresCampos.telefono)) {
        errores.telefono = "Teléfono inválido, solo números telefónicos de España"
    }
    if (!estaVacio(valoresCampos.email) && !regex.emailDianaNails.test(valoresCampos.email)) {
        errores.email = "Email inválido"
    }

    if (esEdicion == false) {
        if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
            errores.contrasena = "Contraseña inválida, mínimo 6 carácteres, una letra mayuscula y un carácter especial"
        }
        if (!estaVacio(valoresCampos.confirmarContrasena) && !estaVacio(valoresCampos.contrasena) && (valoresCampos.confirmarContrasena != valoresCampos.contrasena)) {
            errores.confirmarContrasena = "Las contraseñas no coinciden"
        }
    }

    return errores

}

// Funcion que se encarga de validar los campos del formulario de manicurista al perder el foco
export const manicuristaValidacionOnBlur = (campo, valor, confirmarContrasena = "") => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "dniNie":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.dniNie.test(valor)) {
                    error = "DNI/NIE inválido, solo una letra inicial en caso de NIE, seguido de 8 números y una letra final"
                } else {
                    error = 0
                }
            }
            break;
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
        case "email":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.emailDianaNails.test(valor)) {
                    error = "Email inválido"
                } else {
                    error = 0
                }
            }
            break;
        case "contrasena":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.contrasena.test(valor)) {
                    error = "Contraseña inválida, mínimo 6 carácteres, una letra mayuscula y un carácter especial"
                } else {
                    error = 0
                }
            }
            break;
        case "confirmarContrasena":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (valor != confirmarContrasena) {
                    error = "Las contraseñas no coinciden"
                } else {
                    error = 0
                }

            }
            break;
    }

    return error
}