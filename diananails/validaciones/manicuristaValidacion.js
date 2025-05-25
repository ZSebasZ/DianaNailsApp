import { regex, estaVacio } from "../utils/regexCamposUtils";

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
        errores.dniNie = "DNI/NIE invalido, solo 1 letras inicial en caso de NIE, seguido de 8 numeros y una letra final"
    }
    if (!estaVacio(valoresCampos.nombre) && !regex.nombre.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre invalido, solo caracteres albaticos y 50 como maximo"
    }
    if (!estaVacio(valoresCampos.apellidos) && !regex.apellidos.test(valoresCampos.apellidos)) {
        errores.apellidos = "Apellidos invalidos, solo caracteres albaticos y 100 como maximo"
    }
    if (!estaVacio(valoresCampos.telefono) && !regex.telefono.test(valoresCampos.telefono)) {
        errores.telefono = "Telefono invalido, solo numeros telefonicos de España"
    }
    if (!estaVacio(valoresCampos.email) && !regex.emailDianaNails.test(valoresCampos.email)) {
        errores.email = "Email invalido"
    }

    if (esEdicion == false) {
        if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
            errores.contrasena = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
        }
        if (!estaVacio(valoresCampos.confirmarContrasena) && !estaVacio(valoresCampos.contrasena) && (valoresCampos.confirmarContrasena != valoresCampos.contrasena)) {
            errores.confirmarContrasena = "Las contraseñas no coinciden"
        }
    }

    return errores

}

export const manicuristaValidacionOnBlur = (campo, valor, confirmarContrasena = "") => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "dniNie":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.dniNie.test(valor)) {
                    error = "DNI/NIE invalido, solo 1 letras inicial en caso de NIE, seguido de 8 numeros y una letra final"
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
                    error = "Nombre invalido, solo caracteres albaticos y 50 como maximo onblur"
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
                    error = "Apellidos invalidos, solo caracteres albaticos y 100 como maximo"
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
                    error = "Telefono invalido, solo numeros telefonicos de España"
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
                    error = "Email invalido"
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
                    error = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
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