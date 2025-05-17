import { View, Text, StatusBar, Keyboard } from "react-native";
import { Stack, router } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { loginStyles } from '../styles/loginStyles';
import { LogoPrincipal } from "../components/LogoPrincipal";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { use, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { ContenedorInputs } from "../components/ContenedorInputs";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { BotonTexto } from "../components/BotonTexto";
import { validacionLogin } from "../validaciones/loginValidacion";
import { loginCliente } from "../api/AuthController";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Pantalla de Login
export const LoginScreen = () => {

    useEffect(() => {

    }, [])


    //Estilos
    const styles = useThemedStyles(loginStyles);
    const colors = useThemedStyles();
    const fuenteTexto = fuenteTextoStyles();

    //VALIDACIONES
    const [valoresCampos, setValoresCampos] = useState({
        email: "prueba@gmail.com",
        contrasena: "Abc123."
    })

    const [errores, setErrores] = useState({})
    const [credencialesIncorrectas, setCredencialesIncorrectas] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)

    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    const onSubmit = async () => {
        Keyboard.dismiss()
        setCredencialesIncorrectas(false)
        const validacionErrores = validacionLogin(valoresCampos)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)

                const respuesta = await loginCliente(valoresCampos)
                console.log("Inicio de sesion exitoso:", respuesta)

                await AsyncStorage.setItem('tipoUsuario', respuesta.tipoUsuario)
                await AsyncStorage.setItem('email', valoresCampos.email)
                await AsyncStorage.setItem('contrasena', valoresCampos.contrasena)

                setCredencialesIncorrectas(false)
                router.replace("/(tabs-cliente)/(agendarCita)/")
            } catch (error) {
                const mensajeError = error.response?.data?.mensaje || 'Ocurrió un error inesperado';
                console.log(mensajeError)
                setCredencialesIncorrectas(true)
            } finally {
                setModalLoaderVisible(false);
            }
        }
    }

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                    headerTintColor: colors.onBackground,
                    headerTitle: "",
                }}
            />
            <ModalLoader
                visible={modalLoaderVisible}
            />

            <View style={styles.contenedorPrincipal}>
                <StatusBar style="auto" />
                <LogoPrincipal screen={"login"} />
                <View>
                    <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>Inicia sesión</Text>
                    <ContenedorInputs>
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
                        />
                        {credencialesIncorrectas && (
                            <Text style={styles.credencialesIncorrectas}>Credenciales incorrectas, intentelo de nuevo</Text>
                        )}
                    </ContenedorInputs>
                    <View style={styles.contenedorBotones}>
                        <BotonTexto
                            botonPrincipal={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Iniciar sesión"}
                            onPress={onSubmit}
                        />
                        <BotonTexto
                            botonPrincipal={true}
                            esLink={true}
                            replace={true}
                            href={"/(auth)/registro"}
                            fondo={false}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Registrarme"}
                        />
                    </View>
                </View>
            </View>
        </Screen>

    );
}