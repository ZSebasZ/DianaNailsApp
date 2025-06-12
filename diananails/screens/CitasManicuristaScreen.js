import { View, ScrollView, FlatList, Text, BackHandler } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../contexts/authContext";
import { obtenerCitasPorManicurista } from "../api/CitasController";
import { ModalErrorAPI } from "../components/ModalErrorAPI";
import { useRootNavigationState, useFocusEffect } from "expo-router";



//Pantalla de CitasManicurista
export const CitasManicuristaScreen = () => {

    // Logica para salir de la app con darle al boton de atras
    const rootState = useRootNavigationState();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (!rootState) return false;

                const currentRoute = rootState.routes[rootState.index];

                console.log(currentRoute.name);

                if (currentRoute.name === "navegacion/manicurista") {
                    BackHandler.exitApp();
                    return true;
                }

                return false;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => backHandler.remove();
        }, [rootState])
    );

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(citasClienteStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estados
    const [citas, setCitas] = useState(null)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Funcion para cargar las citas
    const cargarCitas = async () => {
        try {
            const respuesta = await obtenerCitasPorManicurista(usuario.datosUsuario.id)// esto ya es el array correcto
            setCitas(respuesta.citas);
        } catch (error) {
            setModalErrorAPI(true)
        }

    };

    // UseEffect para cargar las citas
    useEffect(() => {
        cargarCitas();
    }, [])

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Citas"}
                        textInfo1={"Próximas citas agendadas con tus clientes"}
                    />
                    {citas === null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando citas...</Text>
                        </View>
                    ) : (
                        citas === undefined ? (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.textInfo, { marginBottom: 10 }]}>Aun no tienes citas que atender</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={citas}
                                contentContainerStyle={{
                                    gap: 20,
                                    marginBottom: 15
                                }}
                                renderItem={({ item }) =>
                                    <CardCita
                                        mostrarCliente={true}
                                        datosCita={item.cita}
                                        onPress={undefined}
                                    />
                                }
                                scrollEnabled={false}

                            >
                            </FlatList>
                        )
                    )}

                    {/*<View style={styles.contenedorCitas}>
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                        <CardCita
                            manicuristaImg={manicurista}
                            manicuristaNombre={"Sara Ramirez"}
                            mostrarCliente={false}
                        />
                    </View>*/}
                </ScrollView>
            </View>
        </Screen>
    );
}