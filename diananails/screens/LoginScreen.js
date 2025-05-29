import { View, Text, StatusBar, Keyboard } from "react-native";
import { Stack, router } from 'expo-router';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { loginStyles } from '../styles/loginStyles';
import { LogoPrincipal } from "../components/LogoPrincipal";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { useContext, useState } from "react";
import { ContenedorInputs } from "../components/ContenedorInputs";
import { CampoTextoInput } from "../components/CampoTextoInput";
import { BotonTexto } from "../components/BotonTexto";
import { validacionLogin, loginValidacionOnBlur } from "../validaciones/loginValidacion";
import { ModalLoader } from "../components/ModalLoader";
import { AuthContext } from "../contexts/authContext";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de Login
export const LoginScreen = () => {

    // Usamos el contexto de autenticación
    const { login, tipoLogin } = useContext(AuthContext)

    //Estiloe, tema, y fuentes
    const styles = useThemedStyles(loginStyles);
    const colors = useThemedStyles();
    const fuenteTexto = fuenteTextoStyles();

    // Estado para los campos del login
    const [valoresCampos, setValoresCampos] = useState({
        //email: "admin@diananails.com",
        //email: "sgarcia@diananails.com",
        email: "prueba1@gmail.com",
        contrasena: "Abc123."
    })

    // Estados para las validaciones
    const [errores, setErrores] = useState({})
    const [credencialesIncorrectas, setCredencialesIncorrectas] = useState(false)

    //Estado del modal
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Funcion para ir asignando valores al estado valoresCampos
    const onValueChange = (nombreCampo, valor) => {
        setValoresCampos({ ...valoresCampos, [nombreCampo]: valor })
    }

    // Funcion para enviar el formulario
    const onSubmit = async () => {
        Keyboard.dismiss()
        setCredencialesIncorrectas(false)
        const validacionErrores = validacionLogin(valoresCampos, tipoLogin)
        setErrores(validacionErrores)
        if (Object.keys(validacionErrores).length == 0) {
            try {
                setModalLoaderVisible(true)
                const respuesta = await login(valoresCampos)
                setCredencialesIncorrectas(false)
                switch (respuesta.tipoUsuario) {
                    case 0:
                        router.push("/navegacion/admin/")
                        console.log("ADMIN")
                        break;
                    case 1:
                        router.push("/navegacion/manicurista/")
                        console.log("MANICURISTA")
                        break;
                    case 2:
                        router.push("/navegacion/cliente/")
                        console.log("CLIENTE")
                        break;
                    default:
                        console.log("NO SE HA CARGADO TIPO USUARIO")
                        break;
                }
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
                setCredencialesIncorrectas(true)
            } finally {
                setModalLoaderVisible(false);
            }
        }
    }

    // Renderizamos la pantalla
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
                        {tipoLogin == 2 && (
                            <BotonTexto
                                botonPrincipal={true}
                                esLink={true}
                                replace={false}
                                href={"/navegacion/(auth)/registro"}
                                fondo={false}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Registrarme"}
                            />
                        )}

                    </View>
                </View>
            </View>
        </Screen>

    );
}