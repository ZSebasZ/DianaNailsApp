import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { inicioStyles } from '../styles/inicioStyles';
import { abrirPerfilInstagram } from '../utils/instagramUtils';
import { Screen } from '../components/Screen';
import { LogoPrincipal } from '../components/LogoPrincipal';
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { BotonIconoTexto } from '../components/BotonIconoTexto';
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { BotonIcono } from '../components/BotonIcono';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useRootNavigationState } from "expo-router";
import { AuthContext } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de Inicio
export const InicioScreen = () => {

    //Estilos, tema, y fuentes
    const styles = useThemedStyles(inicioStyles);
    const fuenteTexto = fuenteTextoStyles();
    const tema = useContext(ThemeContext);

    // Funcion para salir de la app
    const rootState = useRootNavigationState();
    useEffect(() => {
        const onBackPress = () => {
            if (!rootState) return false;

            const currentRoute = rootState.routes[rootState.index];

            if (currentRoute.name === "index") {
                BackHandler.exitApp();
                return true;
            }

            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [rootState]);

    // Usamos context de autenticacion
    const { login, tipoLoginUsuario } = useContext(AuthContext)

    // Estado para verificar la sesion
    const [verificandoSesion, setVerificandoSesion] = useState(true);

    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // UseEffect para verificar la sesion
    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                const contrasena = await AsyncStorage.getItem("contrasena");

                //console.log("email", email)
                //console.log("contrasena", contrasena)


                if (email && contrasena) {
                    const respuesta = await login({ email, contrasena })
                    switch (respuesta.tipoUsuario) {
                        case 0:
                            router.push("/navegacion/admin/")
                            break;
                        case 1:
                            router.push("/navegacion/manicurista/")
                            break;
                        case 2:
                            router.push("/navegacion/cliente/")
                            break;
                        default:
                            break;
                    }
                } else {
                    setVerificandoSesion(false);
                }

            } catch (error) {
                setModalErrorAPI(true)
            }
        };
        verificarSesion();
    }, []);

    // Renderizamos la pantalla
    return (
        <Screen>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <StatusBar style="auto" />
            {verificandoSesion == true ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LogoPrincipal screen={"login"} />
                </View>
            ) : (
                <View style={styles.contenedorPrincipal}>
                    <View>
                        <LogoPrincipal screen={"inicio"} />
                        <View>
                            <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>Bienvenido a</Text>
                            <Text style={[fuenteTexto.caveatBold, styles.textNombreApp]}>DianaNails App</Text>
                            <Text style={[fuenteTexto.gantariBold, styles.textTitulo]}>¿Como desea iniciar?</Text>
                        </View>
                    </View>
                    <View style={styles.contenedorBotones}>
                        <BotonIconoTexto
                            esLink={true}
                            href={"./navegacion/(auth)/login" /*"/(auth)/login"*/}
                            nombreIcono={"account"}
                            fondo={true}
                            fuenteTexto={fuenteTexto.caveatBold}
                            textoBoton={" Soy cliente "}
                            onPress={() => { tipoLoginUsuario(2) }}
                        />

                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/(auth)/login"}
                            nombreIcono={"card-account-details"}
                            fondo={true}
                            fuenteTexto={fuenteTexto.caveatBold}
                            textoBoton={" Soy manicurista "}
                            onPress={() => { tipoLoginUsuario(0) }}
                        />
                    </View>
                    <View style={styles.contenedorIconoInstagram}>
                        <BotonIcono
                            esLink={false}
                            nombreIcono={"instagram"}
                            fondo={false}
                            colorFondo={[tema.background, tema.primary]}
                            onPress={() => abrirPerfilInstagram()}
                        />
                    </View>
                </View>
            )}

        </Screen>

    );
}