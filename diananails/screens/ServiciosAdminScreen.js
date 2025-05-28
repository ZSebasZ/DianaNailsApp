import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { agendarCitaStyles } from '../styles/agendarCitaStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { CardServicio } from "../components/CardServicio";
import { useEffect, useState } from 'react';
import { router } from "expo-router";
import { obtenerServicios } from "../api/ServiciosController";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

//Pantalla de Login
export const ServiciosAdminScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(agendarCitaStyles);

    /*
    const rootState = useRootNavigationState();

    useEffect(() => {
        const onBackPress = () => {
            if (!rootState) return false;

            const currentRoute = rootState.routes[rootState.index];

            // Ajusta esto según tu ruta real
            if (currentRoute.name === "navegacion/(tabs-cliente)") {
                BackHandler.exitApp(); // salir de la app
                return true;
            }

            return false; // permite navegación normal hacia atrás
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => backHandler.remove();
    }, [rootState]);
    */
    //const { serviciosSeleccionados, alternarSeleccionServicio, fecha, resetHoraManicuristas, subtotal } = useContext(AgendarCitaContext)

    // Estados de los servicios
    const [servicios, setServicios] = useState(null)

    // UseEffect para obtener los servicios
    useEffect(() => {
        const cargarServicios = async () => {
            const respuesta = await obtenerServicios();
            setServicios(respuesta);
        };

        cargarServicios();
    }, [])

    // UseFocusEffect para obtener los servicios
    useFocusEffect(
        useCallback(() => {
            const cargarServicios = async () => {
                const respuesta = await obtenerServicios();
                setServicios(respuesta);
            };
            cargarServicios();
        }, [])
    );

    //Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Servicios"}
                        textInfo1={"Gestione los servicios que ofrece DianaNails"}
                        textInfo2={"Para editar alguno, solo haga tap sobre el"}
                    />
                    {servicios == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando servicios...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={servicios}
                            numColumns={2}

                            contentContainerStyle={{
                                gap: 20,
                                marginBottom: 20
                            }}
                            columnWrapperStyle={{
                                justifyContent: "center",
                                gap: 20
                            }}
                            renderItem={({ item }) =>
                                <CardServicio
                                    estaSeleccionado={false}
                                    fuenteTextoBold={fuenteTexto.gantariBold}
                                    fuenteTextoRegular={fuenteTexto.gantariRegular}
                                    servicio={item}
                                    onPress={() => {
                                        /*NAVEGACION*/
                                        router.push(`/navegacion/admin/(gestionAdmin)/servicio/${item.id}`)
                                    }}
                                />
                            }
                            scrollEnabled={false}

                        >
                        </FlatList>
                    )}



                </ScrollView>
            </View>
        </Screen>
    );
}