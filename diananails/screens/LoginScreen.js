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
import { validacionLogin, loginValidacionOnBlur } from "../validaciones/loginValidacion";
import { loginCliente } from "../api/AuthController";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../contexts/authContext";

//Pantalla de Login
export const LoginScreen = () => {

    const { login, usuario } = useContext(AuthContext)

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                const contrasena = await AsyncStorage.getItem("contrasena");



                if (email && contrasena) {
                    //const respuesta = await loginCliente({ email, contrasena });
                    const respuesta = await login({ email, contrasena })
                    //console.log("Inicio de sesión exitoso:", respuesta);
                    setCredencialesIncorrectas(false);
                    //router.replace("/navegacion/(tabs-cliente)/(agendarCita)/");
                    switch (respuesta.tipoUsuario) {
                        case 0:
                            router.push("/navegacion/(tabs-admin)/citas")
                            //console.log("ADMIN")
                            break;
                        case 1:
                            router.push("/navegacion/(tabs-manicurista)/citas")
                            console.log("MANICURISTA")
                            break;
                        case 2:
                            router.push("/navegacion/(tabs-cliente)/(agendarCita)/")
                            console.log("CLIENTE")
                            break;
                        default:
                            console.log("NO SE HA CARGADO TIPO USUARIO")
                            break;
                    }


                } else {
                    console.log("No hay datos guardados para email o contraseña");
                }
            } catch (error) {
                console.log("Error al verificar la sesión:", error);
            }
        };

        verificarSesion();
    }, []);

    //Estilos
    const styles = useThemedStyles(loginStyles);
    const colors = useThemedStyles();
    const fuenteTexto = fuenteTextoStyles();

    //VALIDACIONES
    const [valoresCampos, setValoresCampos] = useState({
        email: "sgarcia@diananails.com",
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
                const respuesta = await login(valoresCampos)

                setCredencialesIncorrectas(false)
                //router.replace("/navegacion/(tabs-cliente)/(agendarCita)/");
                switch (respuesta.tipoUsuario) {
                    case 0:
                        router.push("/navegacion/(tabs-admin)/citas")
                        console.log("ADMIN")
                        break;
                    case 1:
                        router.push("/navegacion/(tabs-manicurista)/citas")
                        console.log("MANICURISTA")
                        break;
                    case 2:
                        router.push("/navegacion/(tabs-cliente)/(agendarCita)/")
                        console.log("CLIENTE")
                        break;
                    default:
                        console.log("NO SE HA CARGADO TIPO USUARIO")
                        break;
                }

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
                            onBlurValidacion={loginValidacionOnBlur}
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
                            onBlurValidacion={loginValidacionOnBlur}
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