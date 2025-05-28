import { regex, estaVacio } from "../utils/regexCamposUtils";

// Funcion que se encarga de validar el formulario completo de opinion
export const validacionOpinion = (valoresCampos) => {
    const textCampoObligatorio = "Este campo es obligatorio"

    const errores = {}

    const camposObligatorios = [
        "titulo",
        "descripcion"
    ];

    camposObligatorios.forEach((campo) => {
        if (estaVacio(valoresCampos[campo])) {
            errores[campo] = textCampoObligatorio;
        }
    });

    if (!estaVacio(valoresCampos.titulo) && !regex.tituloOpinion.test(valoresCampos.titulo)) {
        errores.titulo = "Titulo invalido, solo caracteres alfabeticos y maximo 50"
    }
    if (!estaVacio(valoresCampos.descripcion) && !regex.descripcionOpinion.test(valoresCampos.descripcion)) {
        errores.descripcion = "Descripcion invalida, maximo 500 caracteres"
    }

    return errores

}

// Funcion que se encarga de validar los campos del formulario de opinion al perder el foco
export const opinionValidacionOnBlur = (campo, valor) => {

    const textCampoObligatorio = "Este campo es obligatorio"

    let error = null

    switch (campo) {
        case "titulo":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.tituloOpinion.test(valor)) {
                    error = "Titulo invalido, solo caracteres alfabeticos y maximo 50"
                } else {
                    error = 0
                }
            }
            break;
        case "descripcion":
            if (estaVacio(valor)) {
                error = textCampoObligatorio;
            } else {
                if (!regex.descripcionOpinion.test(valor)) {
                    error = "Descripcion invalida, maximo 500 caracteres"
                } else {
                    error = 0
                }
            }
            break;
    }

    return error
}