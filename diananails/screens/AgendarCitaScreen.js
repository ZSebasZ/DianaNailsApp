import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { agendarCitaStyles } from '../styles/agendarCitaStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { CardServicio } from "../components/CardServicio";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { useContext, useEffect, useState } from 'react';
import { fetchFromApi } from '../api/ApiService';
import { BackHandler } from 'react-native';
import { router } from "expo-router";
import { useRootNavigationState } from "expo-router";
import { obtenerServicios } from "../api/ServiciosController";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";

//Pantalla de Login
export const AgendarCitaScreen = () => {

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

    const { serviciosSeleccionados, alternarSeleccionServicio, fecha, resetHoraManicuristas, subtotal } = useContext(AgendarCitaContext)

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(agendarCitaStyles);

    const [servicios, setServicios] = useState()

    useEffect(() => {
        const cargarServicios = async () => {
            const respuesta = await obtenerServicios(); // esto ya es el array correcto
            setServicios(respuesta);
        };

        cargarServicios();
    }, [])

    useEffect(() => {
        if(fecha != null) {
            resetHoraManicuristas()
        }
    }, [serviciosSeleccionados])



    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Agenda tu cita"}
                        textInfo1={"Selecciona los servicios deseados"}
                        textInfo2={"3 como máximo"}
                    />


                    <FlatList
                        data={servicios}
                        numColumns={2}

                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 80
                        }}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            gap: 20
                        }}
                        renderItem={({ item }) =>
                            <CardServicio
                                estaSeleccionado={serviciosSeleccionados.some(s => s.id === item.id)}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                servicio={item}
                                onPress={() => alternarSeleccionServicio(item)}
                            />
                        }
                        scrollEnabled={false}

                    >
                    </FlatList>

                </ScrollView>
            </View>
            <BotonesCancelarVerServicios />
            <BarraResumen
                botonSiguiente={true}
                btnSiguienteDeshabilitado={serviciosSeleccionados.length == 0 ? true : false}
                subtotal={subtotal}
                hrefSiguiente={"/navegacion/(tabs-cliente)/(agendarCita)/(screens)/elegirFechaHora"}
            />
        </Screen>
    );
}