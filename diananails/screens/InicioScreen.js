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
import { useEffect } from 'react';
import { fetchFromApi } from '../api/ApiService';
import { BackHandler } from 'react-native';
import { useRootNavigationState } from "expo-router";

//Pantalla de bienvenida a la aplicacion
export const InicioScreen = () => {

    const rootState = useRootNavigationState();

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
                    />

                    <BotonIconoTexto
                        esLink={true}
                        href={"/(auth)/login"}
                        nombreIcono={"card-account-details"}
                        fondo={true}
                        fuenteTexto={fuenteTexto.caveatBold}
                        textoBoton={" Soy manicurista "}
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
        </Screen>

    );
}