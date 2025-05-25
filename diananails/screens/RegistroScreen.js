import { View, Text, StatusBar, ScrollView, Alert, Keyboard, ActivityIndicator, Modal, Pressable } from "react-native";
import { Stack } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { registroStyles } from '../styles/registroStyles';
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { ContenedorInputs } from "../components/ContenedorInputs";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { BotonTexto } from "../components/BotonTexto";
import { validacionRegistro, registroValidacionOnBlur } from "../validaciones/registroValidacion";
import { useEffect, useState, useContext } from "react";
import { registroCliente } from "../api/AuthController";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ModalFeedback } from "../components/ModalFeedback";
import { ModalLoader } from "../components/ModalLoader";
import { AuthContext } from "../contexts/authContext";

//Pantalla de Login
export const RegistroScreen = () => {

    const { tipoLogin } = useContext(AuthContext)

    const styles = useThemedStyles(registroStyles);
    const fuenteTexto = fuenteTextoStyles();

    //VALIDACIONES
    const [valoresCampos, setValoresCampos] = useState({
        /*
        nombre: "sebas",
        apellidos: "jimenez",
        telefono: "657575757",
        direccionEnvio: "pase, 21",
        email: "prueba1@gmail.com",
        contrasena: "Abc123.",
        confirmarContrasena: "Abc123."
        */

        nombre: null,
        apellidos: null,
        telefono: null,
        direccionEnvio: null,
        email: null,
        contrasena: null,
        confirmarContrasena: null
    })
    const [errores, setErrores] = useState({})

    //const [cargando, setCargando] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)

    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    const onSubmit = async () => {
        Keyboard.dismiss()

        const validacionErrores = validacionRegistro(valoresCampos)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const respuesta = await registroCliente(valoresCampos);
                console.log('Registro exitoso:', respuesta);

                //Alert.alert('Éxito', 'Cliente registrado correctamente');
                // Aquí puedes redirigir a otra pantalla si quieres
                setModalFeedbackVisible(true)
            } catch (error) {
                const mensajeError = error.response?.data?.mensaje || 'Ocurrió un error inesperado';
                //Alert.alert('Error', mensajeError);

                // Ejemplo: si el error es del campo `email`, puedes mostrarlo directamente
                if (mensajeError.includes("correo")) {
                    setErrores({ ...errores, email: mensajeError });
                }
            } finally {
                setModalLoaderVisible(false); // Ocultar loader
            }
        }
    }

    const resetFormulario = () => {
        setValoresCampos({
            nombre: null,
            apellidos: null,
            telefono: null,
            direccionEnvio: null,
            email: null,
            contrasena: null,
            confirmarContrasena: null
        })
    }

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <ModalLoader
                visible={modalLoaderVisible}
            />

            <ModalFeedback
                titulo={"Registro completado"}
                feedback={"Te ha registrado con exito, ahora inicia sesion"}
                navegacion={true}
                href={"../"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                    resetFormulario()
                }}
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={[styles.contenedorPrincipal]}>
                    <StatusBar style="auto" />
                    <View>
                        <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>Registrate</Text>
                        <ContenedorInputs>
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"account"}
                                placeHolder={"Nombre"}
                                contrasena={false}
                                nombreCampo={"nombre"}
                                valorCampo={valoresCampos.nombre}
                                onValueChange={onValueChange}
                                errorValidacion={errores.nombre}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"account"}
                                placeHolder={"Apellidos"}
                                contrasena={false}
                                nombreCampo={"apellidos"}
                                valorCampo={valoresCampos.apellidos}
                                onValueChange={onValueChange}
                                errorValidacion={errores.apellidos}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"phone"}
                                placeHolder={"Telefono"}
                                contrasena={false}
                                nombreCampo={"telefono"}
                                valorCampo={valoresCampos.telefono}
                                onValueChange={onValueChange}
                                errorValidacion={errores.telefono}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"map-marker"}
                                placeHolder={"Direccion de envio"}
                                contrasena={false}
                                nombreCampo={"direccionEnvio"}
                                valorCampo={valoresCampos.direccionEnvio}
                                onValueChange={onValueChange}
                                errorValidacion={errores.direccionEnvio}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"email"}
                                placeHolder={"Email"}
                                contrasena={false}
                                nombreCampo={"email"}
                                valorCampo={valoresCampos.email}
                                onValueChange={onValueChange}
                                errorValidacion={errores.email}
                                onBlurValidacion={registroValidacionOnBlur}
                                tipoLogin={tipoLogin}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"lock"}
                                placeHolder={"Contraseña"}
                                contrasena={true}
                                nombreCampo={"contrasena"}
                                valorCampo={valoresCampos.contrasena}
                                onValueChange={onValueChange}
                                errorValidacion={errores.contrasena}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                            <CampoTextoInput
                                conIcono={true}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                nombreIcono={"lock-check"}
                                placeHolder={"Confirmar contraseña"}
                                contrasena={true}
                                nombreCampo={"confirmarContrasena"}
                                valorCampo={valoresCampos.confirmarContrasena}
                                onValueChange={onValueChange}
                                errorValidacion={errores.confirmarContrasena}
                                verificarContrasena={valoresCampos.contrasena}
                                onBlurValidacion={registroValidacionOnBlur}
                            />
                        </ContenedorInputs>
                        <View style={styles.contenedorBotones}>
                            <BotonTexto
                                botonPrincipal={true}
                                esLink={false}
                                fondo={true}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Registrarme"}
                                onPress={onSubmit}
                            />
                            <BotonTexto
                                botonPrincipal={true}
                                esLink={true}
                                href={"../"}
                                fondo={false}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Volver"}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}