import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de login
export const validacionLogin = (valoresCampos, tipoLogin) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    const camposObligatorios = [
        "email",
        "contrasena"
    ];

    camposObligatorios.forEach((campo) => {
        if (estaVacio(valoresCampos[campo])) {
            errores[campo] = textCampoObligatorio;
        }
    });

    if (tipoLogin == 0) {
        if (!estaVacio(valoresCampos.email) && !regex.emailDianaNails.test(valoresCampos.email)) {
            errores.email = "Email inválido, el dominio debe ser el de la empresa"
        }
    } else {
        if (!estaVacio(valoresCampos.email) && !regex.email.test(valoresCampos.email)) {
            errores.email = "Email inválido"
        }
    }

    if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
        errores.contrasena = "Contraseña inválida, mínimo 6 caracteres, una letra mayúscula y un carácter especial"
    }

    return errores

}

// Funcion que encarga de validar los campos del formulario de login al perder el foco
export const loginValidacionOnBlur = (campo, valor, tipoLogin) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "email":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (tipoLogin == 0) {
                    if (!regex.emailDianaNails.test(valor)) {
                        error = "Email inválido, el dominio debe ser el de la empresa"
                    } else {
                        error = 0
                    }
                } else {
                    if (!regex.email.test(valor)) {
                        error = "Email inválido"
                    } else {
                        error = 0
                    }
                }

            }
            break;
        case "contrasena":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.contrasena.test(valor)) {
                    error = "Contraseña inválida, mínimo 6 caracteres, una letra mayúscula y un carácter especial"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}