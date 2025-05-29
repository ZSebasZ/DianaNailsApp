import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { obtenerCitasClientes } from "../api/CitasController";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de CitasAdmin
export const CitasAdminScreen = () => {

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
            const respuesta = await obtenerCitasClientes(usuario.datosUsuario.id)// esto ya es el array correcto
            setCitas(respuesta.citas);
        } catch (error) {
            setModalErrorAPI(true)
        }

    };

    // UseEffect para cargar las citas
    useEffect(() => {
        cargarCitas();
    }, [])

    //Renderizamos la pantalla
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
                        textInfo1={"Proximas citas de los clientes"}
                    />
                    {citas === null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando citas...</Text>
                        </View>

                    ) : (
                        citas === undefined ? (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.textInfo, { marginBottom: 10 }]}>Aun no hay citas pendientes</Text>
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