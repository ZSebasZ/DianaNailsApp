import { regex, estaVacio } from "../utils/regexCamposUtils";

export const validacionLogin = (valoresCampos) => {
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

    if (!estaVacio(valoresCampos.email) && !regex.email.test(valoresCampos.email)) {
        errores.email = "Email invalido"
    }
    if (!estaVacio(valoresCampos.contrasena) && !regex.contrasena.test(valoresCampos.contrasena)) {
        errores.contrasena = "Contraseña invalida, minimo 6 caracteres, una letra mayuscula y caracterer especial"
    }

    return errores


}