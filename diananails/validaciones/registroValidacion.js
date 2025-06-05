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
        errores.nombre = "Nombre inválido, solo carácteres alfabéticos y 50 como máximo"
    }
    if (!estaVacio(valoresCampos.apellidos) && !regex.apellidos.test(valoresCampos.apellidos)) {
        errores.apellidos = "Apellidos inválidos, solo carácteres alfabéticos y 100 como máximo"
    }
    if (!estaVacio(valoresCampos.telefono) && !regex.telefono.test(valoresCampos.telefono)) {
        errores.telefono = "Teléfono inválido, solo números telefónicos de España"
    }
    if (!estaVacio(valoresCampos.direccionEnvio) && !regex.direccionEnvio.test(valoresCampos.direccionEnvio)) {
        errores.direccionEnvio = "Dirección de envio inválida. Usa: calle, número, (opcional: detalles)"
    }
    if (!estaVacio(valoresCampos.email) && !regex.email.test(valoresCampos.email)) {
        errores.email = "Email inválido"
    }
    if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
        errores.contrasena = "Contraseña inválida, mínimo 6 carácteres, una letra mayúscula y un carácter especial"
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
        case "email":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.email.test(valor)) {
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
                    error = "Contraseña inválida, mínimo 6 carácteres, una letra mayúscula y un carácter especial"
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