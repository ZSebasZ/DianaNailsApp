import { View, Text, ScrollView, Alert } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { perfilStyles } from '../styles/perfilStyles';
import { useContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";
import { BotonTexto } from "../components/BotonTexto";
import { TomarEscogerImagen } from "../components/TomarEscogerImagen";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { eliminarCuentaCliente, fotoUsuario } from "../api/AuthController";
import { AuthContext } from "../contexts/authContext";
import { Stack } from "expo-router";
import { Keyboard } from "react-native";
import { validacionUpdateDatos, updateDatosValidacionOnBlur } from "../validaciones/updateDatosValidacion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { ModalConfirmarAccion } from "../components/ModalConfirmarAccion";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de Perfil
export const PerfilScreen = () => {

    //Estilos y fuentes
    const styles = useThemedStyles(perfilStyles);
    const fuenteTexto = fuenteTextoStyles();

    // Usamos el contexto de autenticación
    const { usuario, actualizarFotoUsuario, updateDatos, cerrarSesion } = useContext(AuthContext)

    // Estados de los modales
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalFeedbackActuDatosVisible, setModalFeedbackActuDatosVisible] = useState(false)
    const [modalFeedbackActuFotoVisible, setModalFeedbackActuFotoVisible] = useState(false)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Estados para gestionar validaciones del formulario
    const [deshabilitadoBtnGuardarFoto, setDeshabilitadoBtnGuardarFoto] = useState(true)
    const [errores, setErrores] = useState({})
    const [valoresCampos, setValoresCampos] = useState({
        nombre: usuario.datosUsuario.nombre,
        apellidos: usuario.datosUsuario.apellidos,
        telefono: usuario.datosUsuario.telefono,
        ...(usuario.tipoUsuario == 2 && {
            direccionEnvio: usuario.datosUsuario.direccion_envio
        }),

        ...((usuario.tipoUsuario == 0 || usuario.tipoUsuario == 1) && {
            dni: usuario.datosUsuario.dni
        })
    })

    // Funcion para ir asignando valores al estado valoresCampos
    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    // Funcion para enviar el formulario
    const onSubmit = async () => {
        Keyboard.dismiss()
        const validacionErrores = validacionUpdateDatos(valoresCampos)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                updateDatos(valoresCampos)
                setModalLoaderVisible(false)
                setModalFeedbackActuDatosVisible(true)

            } catch (error) {
                const mensajeError = error.response?.data?.mensaje || 'Ocurrió un error inesperado';
                console.log(mensajeError)
            }
        }
    }

    // Estados de la imagen
    const [imageUri, setImageUri] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    // Funcion que pide permisos para abrir la camara y acceder a la galeria
    const pedirPermisos = async () => {
        const permisoCamara = await ImagePicker.requestCameraPermissionsAsync();
        const permisoGaleria = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permisoCamara.granted || !permisoGaleria.granted) {
            //Alert.alert('Permisos requeridos', 'Necesitas otorgar permisos para usar la cámara y la galería.');
            return false;
        }
        return true;
    };

    // Funcion para tomar una foto
    const tomarFoto = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, base64 } = result.assets[0]
            setImageUri(uri);
            setImageBase64(base64)
            setDeshabilitadoBtnGuardarFoto(false)
        } else {
            setDeshabilitadoBtnGuardarFoto(true)
        }
    };

    // Funcion para seleccionar una foto de la galeria
    const seleccionarDeGaleria = async () => {
        const permiso = await pedirPermisos();
        if (!permiso) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, base64 } = result.assets[0]
            setImageUri(uri);
            setImageBase64(base64)
            setDeshabilitadoBtnGuardarFoto(false)
        } else {
            setDeshabilitadoBtnGuardarFoto(true)
        }
    };

    // Funcion para eliminar la foto
    const eliminarFotoUsuario = async () => {
        try {
            setModalLoaderVisible(true)
            await fotoUsuario({ idUsuario: usuario.datosUsuario.id, imagenBase64: null });
            actualizarFotoUsuario(null);
            setImageUri(null);
            setImageBase64(null)
            setModalLoaderVisible(false)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    };

    // Funcion para subir la imagen a Imgur
    const nuevaFotoUsuario = async () => {
        if (imageUri != null) {
            try {
                setModalLoaderVisible(true)
                const respuesta = await fotoUsuario({
                    idUsuario: usuario.datosUsuario.id,
                    imagenBase64: imageBase64,
                });
                actualizarFotoUsuario(respuesta.urlImagen);
                setDeshabilitadoBtnGuardarFoto(true)
                setImageUri(null);
                setImageBase64(null)
                setModalLoaderVisible(false)
                setModalFeedbackActuFotoVisible(true)
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        } else {

        }
    };

    // Funcion para eliminar la cuenta
    const eliminarCuenta = async () => {
        try {
            setModalConfirmarAccion(false)
            setModalLoaderVisible(true)
            await eliminarCuentaCliente(usuario.datosUsuario.id)
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    }

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                }}
            />

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <ModalLoader
                visible={modalLoaderVisible}
            />
            <ModalFeedback
                titulo={"Cuenta eliminada con exito"}
                feedback={"Su cuenta y todos los datos relacionados a ella se han eliminado con exito"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                    cerrarSesion()
                }}
            />

            <ModalFeedback
                titulo={"Datos actualzados"}
                feedback={"Sus datos personales se han actualizado con exito"}
                visible={modalFeedbackActuDatosVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                    setModalFeedbackActuDatosVisible(false)
                }}
            />

            <ModalFeedback
                titulo={"Foto de perfil actualizada"}
                feedback={"Su foto de perfil se ha actualizado con exito"}
                visible={modalFeedbackActuFotoVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                    setModalFeedbackActuFotoVisible(false)
                }}
            />
            <ModalConfirmarAccion
                titulo={"¿Está seguro que quiere eliminar su cuenta y todos los datos relacionados a ella?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setModalConfirmarAccion(false)
                }}
                aceptar={eliminarCuenta}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi perfil"}
                        textInfo1={"Mira y/o actualiza tus datos personales"}
                    />
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 10 }}>
                            <Text style={styles.textTituloSeccion}>Foto de perfil</Text>
                            <TomarEscogerImagen
                                fuenteTexto={fuenteTexto.gantariBold}
                                tomarFoto={tomarFoto}
                                seleccionarDeGaleria={seleccionarDeGaleria}
                                imageUri={imageUri != null && imageUri}
                                urlImagen={usuario.datosUsuario.url_imagen}
                            />
                            <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
                                <BotonIconoTexto
                                    esLink={false}
                                    nombreIcono={"camera"}
                                    fondo={false}
                                    fuenteTextoNormal={fuenteTexto.gantariBold}
                                    textoBoton={"Tomar foto"}
                                    enTab={true}
                                    onPress={tomarFoto}
                                />
                                <BotonIconoTexto
                                    esLink={false}
                                    nombreIcono={"image-multiple"}
                                    fondo={false}
                                    fuenteTextoNormal={fuenteTexto.gantariBold}
                                    textoBoton={"Seleccionar desde mi galeria"}
                                    enTab={true}
                                    onPress={seleccionarDeGaleria}
                                />
                                {usuario.tipoUsuario == 2 &&
                                    <BotonIconoTexto
                                        esLink={false}
                                        nombreIcono={"image-remove"}
                                        fondo={false}
                                        fuenteTextoNormal={fuenteTexto.gantariBold}
                                        textoBoton={"Eliminar foto"}
                                        enTab={true}
                                        onPress={eliminarFotoUsuario}
                                        tipoError={true}

                                    />
                                }
                                <BotonIconoTexto
                                    esLink={false}
                                    nombreIcono={"content-save"}
                                    fondo={true}
                                    fuenteTextoNormal={fuenteTexto.gantariBold}
                                    textoBoton={"Guardar foto"}
                                    enTab={true}
                                    onPress={nuevaFotoUsuario}
                                    deshabilitado={deshabilitadoBtnGuardarFoto}
                                />
                            </View>
                        </View>
                        <View style={{ gap: 10, marginBottom: 15 }}>
                            <Text style={styles.textTituloSeccion}>Datos personales</Text>
                            <View style={{ gap: 15 }}>
                                {(usuario.tipoUsuario == 0 || usuario.tipoUsuario == 1) && (
                                    <CampoTextoInput
                                        conIcono={true}
                                        nombreIcono={"card-account-details"}
                                        fuenteTexto={fuenteTexto.gantariRegular}
                                        placeHolder={"57463456A"}
                                        conLabel={true}
                                        textLabel={"DNI"}
                                        labelCentrado={true}
                                        fuenteTextoLabel={fuenteTexto.gantariBold}
                                        contrasena={false}
                                        nombreCampo={"dniNie"}
                                        valorCampo={usuario.datosUsuario.dni}
                                        deshabilitado={true}
                                    />
                                )}
                                <CampoTextoInput
                                    conIcono={true}
                                    nombreIcono={"account"}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    placeHolder={"Nombre"}
                                    conLabel={true}
                                    textLabel={"Nombre"}
                                    labelCentrado={true}
                                    fuenteTextoLabel={fuenteTexto.gantariBold}
                                    contrasena={false}
                                    nombreCampo={"nombre"}
                                    valorCampo={valoresCampos.nombre}
                                    onValueChange={onValueChange}
                                    errorValidacion={errores.nombre}
                                    onBlurValidacion={updateDatosValidacionOnBlur}
                                />
                                <CampoTextoInput
                                    conIcono={true}
                                    nombreIcono={"account"}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    placeHolder={"Apellidos"}
                                    conLabel={true}
                                    textLabel={"Apellidos"}
                                    labelCentrado={true}
                                    fuenteTextoLabel={fuenteTexto.gantariBold}
                                    contrasena={false}
                                    nombreCampo={"apellidos"}
                                    valorCampo={valoresCampos.apellidos}
                                    onValueChange={onValueChange}
                                    errorValidacion={errores.apellidos}
                                    onBlurValidacion={updateDatosValidacionOnBlur}
                                />
                                <CampoTextoInput
                                    conIcono={true}
                                    nombreIcono={"phone"}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    placeHolder={"Telefono"}
                                    conLabel={true}
                                    textLabel={"Telefono"}
                                    labelCentrado={true}
                                    fuenteTextoLabel={fuenteTexto.gantariBold}
                                    contrasena={false}
                                    nombreCampo={"telefono"}
                                    valorCampo={valoresCampos.telefono}
                                    onValueChange={onValueChange}
                                    errorValidacion={errores.telefono}
                                    onBlurValidacion={updateDatosValidacionOnBlur}
                                />
                                {usuario.tipoUsuario == 2 &&
                                    <CampoTextoInput
                                        conIcono={true}
                                        nombreIcono={"map-marker"}
                                        fuenteTexto={fuenteTexto.gantariRegular}
                                        placeHolder={"Direccion de envio"}
                                        conLabel={true}
                                        textLabel={"Direccion de envio"}
                                        labelCentrado={true}
                                        fuenteTextoLabel={fuenteTexto.gantariBold}
                                        contrasena={false}
                                        nombreCampo={"direccionEnvio"}
                                        valorCampo={valoresCampos.direccionEnvio}
                                        onValueChange={onValueChange}
                                        errorValidacion={errores.direccionEnvio}
                                        onBlurValidacion={updateDatosValidacionOnBlur}
                                    />
                                }
                                <CampoTextoInput
                                    conIcono={true}
                                    nombreIcono={"email"}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    placeHolder={"Email"}
                                    conLabel={true}
                                    textLabel={"Email"}
                                    labelCentrado={true}
                                    fuenteTextoLabel={fuenteTexto.gantariBold}
                                    contrasena={false}
                                    nombreCampo={"email"}
                                    valorCampo={usuario.datosUsuario.email}
                                    onValueChange={onValueChange}
                                    deshabilitado={true}
                                    valorCampoDeshabilitado={usuario.datosUsuario.email}
                                />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, marginTop: 10 }}>
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={false}
                                    fondo={true}
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    textoBoton={"Guardar cambios"}
                                    onPress={onSubmit}
                                />
                                {usuario.tipoUsuario == 2 &&
                                    <BotonTexto
                                        botonNavegacion={true}
                                        esLink={false}
                                        fondo={true}
                                        tipoError={true}
                                        fuenteTexto={fuenteTexto.gantariBold}
                                        textoBoton={"Eliminar cuenta"}
                                        onPress={() => {
                                            setModalConfirmarAccion(true)
                                        }}
                                    />
                                }

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Screen >
    );
}