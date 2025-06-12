import { View, ScrollView } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { gestionStyles } from '../styles/gestionStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonIconoTexto } from "../components/BotonIconoTexto";
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useRootNavigationState, useFocusEffect, router } from "expo-router";

// Pantalla de ActividadCliente
export const ActividadClienteScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(gestionStyles);

    // Logica para ir a la tab inicial
    const rootState = useRootNavigationState();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (!rootState) return false;

                const currentRoute = rootState.routes[rootState.index];

                console.log(currentRoute.name);

                if (currentRoute.name === "navegacion/cliente") {
                    router.replace("/navegacion/cliente/(tabs-cliente)/(agendarCita)");
                    return true;
                }

                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => backHandler.remove();
        }, [rootState])
    );

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi actividad"}
                        textInfo1={"Aquí puedes ver tus citas, revisar tus pedidos fácilmente, leer opiniones y dejar la tuya"}
                    />
                    <View style={styles.containerSeccion}>
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/cliente/(clienteScreens)/(citasOpiniones)/citasCliente"}
                            nombreIcono={"calendar-month"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Mis citas"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/cliente/(clienteScreens)/(pedidosCarrito)/pedidosCliente"}
                            nombreIcono={"truck-delivery"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Mis pedidos"}
                            enTab={true}
                        />
                        <BotonIconoTexto
                            esLink={true}
                            href={"/navegacion/cliente/(clienteScreens)/(citasOpiniones)/opiniones"}
                            nombreIcono={"message-star"}
                            fondo={true}
                            fuenteTextoNormal={fuenteTexto.gantariBold}
                            textoBoton={"Opinar/Opiniones"}
                            enTab={true}
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
}