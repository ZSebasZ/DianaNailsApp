import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { obtenerCitasPorManicurista } from "../api/CitasController";

//Pantalla de CitasManicurista
export const CitasManicuristaScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(citasClienteStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estados
    const [citas, setCitas] = useState(null)

    // Funcion para cargar las citas
    const cargarCitas = async () => {
        const respuesta = await obtenerCitasPorManicurista(usuario.datosUsuario.id)// esto ya es el array correcto
        setCitas(respuesta.citas);
    };

    // UseEffect para cargar las citas
    useEffect(() => {
        cargarCitas();
    }, [])

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Citas"}
                        textInfo1={"Proximas citas de los clientes"}
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