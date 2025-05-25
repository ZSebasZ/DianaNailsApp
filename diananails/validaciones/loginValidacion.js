import { regex, estaVacio } from "../utils/regexCamposUtils";

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
            errores.email = "Email invalido, el dominio debe ser el de al empresa"
        }
    } else {
        if (!estaVacio(valoresCampos.email) && !regex.email.test(valoresCampos.email)) {
            errores.email = "Email invalido"
        }
    }

    if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
        errores.contrasena = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
    }

    return errores

}

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
                        error = "Email invalido, el dominio debe ser el de al empresa"
                    } else {
                        error = 0
                    }
                } else {
                    if (!regex.email.test(valor)) {
                        error = "Email invalido"
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
                    error = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}