import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { fetchFromApi } from '../api/ApiService';
import { BackHandler } from 'react-native';
import { useRootNavigationState } from "expo-router";
import { AuthContext } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

//Pantalla de bienvenida a la aplicacion
export const InicioScreen = () => {

    const rootState = useRootNavigationState();
    const { login, tipoLoginUsuario } = useContext(AuthContext)
    const [verificandoSesion, setVerificandoSesion] = useState(true);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                const contrasena = await AsyncStorage.getItem("contrasena");



                if (email && contrasena) {
                    //const respuesta = await loginCliente({ email, contrasena });
                    const respuesta = await login({ email, contrasena })
                    //console.log("Inicio de sesión exitoso:", respuesta);
                    //setCredencialesIncorrectas(false);
                    //router.replace("/navegacion/(tabs-cliente)/(agendarCita)/");
                    switch (respuesta.tipoUsuario) {
                        case 0:
                            router.push("/navegacion/admin/")
                            //console.log("ADMIN")
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


                } else {
                    setVerificandoSesion(false);
                    console.log("No hay datos guardados para email o contraseña");
                }
            } catch (error) {
                console.log("Error al verificar la sesión:", error);
            }
        };

        verificarSesion();
    }, []);

    useEffect(() => {
        const onBackPress = () => {
            if (!rootState) return false;

            const currentRoute = rootState.routes[rootState.index];

            // Ajusta esto según tu ruta real
            if (currentRoute.name === "index") {
                BackHandler.exitApp(); // salir de la app
                return true;
            }

            return false; // permite navegación normal hacia atrás
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [rootState]);

    //Estilos
    const styles = useThemedStyles(inicioStyles);
    const fuenteTexto = fuenteTextoStyles();

    const tema = useContext(ThemeContext); // Acceder al contexto

    //Devolvemos la vista de la pantalla de bienvenida
    return (
        <Screen>
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