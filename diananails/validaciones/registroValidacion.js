import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de registro
export const validacionRegistro = (valoresCampos) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    const camposObligatorios = [
        "nombre",
        "apellidos",
        "telefono",
        "direccionEnvio",
        "email",
        "contrasena",
        "confirmarContrasena",
    ];

    camposObligatorios.forEach((campo) => {
        if (estaVacio(valoresCampos[campo])) {
            errores[campo] = textCampoObligatorio;
        }
    });

    if (!estaVacio(valoresCampos.nombre) && !regex.nombre.test(valoresCampos.nombre)) {
        errores.nombre = "Nombre invalido, solo caracteres albaticos y 50 como maximo"
    }
    if (!estaVacio(valoresCampos.apellidos) && !regex.apellidos.test(valoresCampos.apellidos)) {
        errores.apellidos = "Apellidos invalidos, solo caracteres albaticos y 100 como maximo"
    }
    if (!estaVacio(valoresCampos.telefono) && !regex.telefono.test(valoresCampos.telefono)) {
        errores.telefono = "Telefono invalido, solo numeros telefonicos de España"
    }
    if (!estaVacio(valoresCampos.direccionEnvio) && !regex.direccionEnvio.test(valoresCampos.direccionEnvio)) {
        errores.direccionEnvio = "Direccion de envio invalida. El formato es: Ciudad, 21, piso 3"
    }
    if (!estaVacio(valoresCampos.email) && !regex.email.test(valoresCampos.email)) {
        errores.email = "Email invalido"
    }
    if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
        errores.contrasena = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
    }
    if (!estaVacio(valoresCampos.confirmarContrasena) && !estaVacio(valoresCampos.contrasena) && (valoresCampos.confirmarContrasena != valoresCampos.contrasena)) {
        errores.confirmarContrasena = "Las contraseñas no coinciden"
    }

    return errores


}

// Funcion que se encarga de validar los campos del formulario de registro al perder el foco
export const registroValidacionOnBlur = (campo, valor, confirmarContrasena = "") => {

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