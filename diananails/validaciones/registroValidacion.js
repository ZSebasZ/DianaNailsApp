import { regex, estaVacio } from "../utils/regexCamposUtils";

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
        errores.direccionEnvio = "Direccion de envio invalida, solo caracteres alfanumericos"
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