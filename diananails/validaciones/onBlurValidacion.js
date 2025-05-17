import { regex, estaVacio } from "../utils/regexCamposUtils";

export const validacionOnBlur = (campo, valor, confirmarContrasena="") => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
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
        case "direccionEnvio":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.direccionEnvio.test(valor)) {
                    error = "Direccion de envio invalida, solo caracteres alfanumericos"
                } else {
                    error = 0
                }
            }
            break;
        case "email":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.email.test(valor)) {
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
                if(valor != confirmarContrasena) {
                    error = "Las contraseñas no coinciden"
                } else {
                    error = 0
                }
                
            }
            break;
    }

    return error
}