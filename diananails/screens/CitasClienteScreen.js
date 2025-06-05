import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { citasClienteStyles } from '../styles/citasClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardCita } from "../components/CardCita";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { cancelarCita, obtenerCitas } from "../api/CitasController";
import { ModalConfirmarAccion } from "../components/ModalConfirmarAccion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { BotonTexto } from "../components/BotonTexto";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de CitasCliente
export const CitasClienteScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(citasClienteStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estados
    const [citas, setCitas] = useState(null)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [citaSeleccionada, setCitaSeleccionada] = useState(null)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)



    // Funcion para cargar las citas
    const cargarCitas = async () => {
        try {
            const respuesta = await obtenerCitas(usuario.datosUsuario.id)// esto ya es el array correcto
            setCitas(respuesta.citas);
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    };

    // UseEffect para cargar las citas
    useEffect(() => {
        cargarCitas();
    }, [])

    // Funcion para eliminar la cita
    const eliminarCita = async () => {
        try {
            setModalConfirmarAccion(false)
            setModalLoaderVisible(true)
            const respuesta = await cancelarCita(usuario.datosUsuario.id, citaSeleccionada)
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
            await cargarCitas();
            setCitaSeleccionada(null)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    }

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <ModalLoader
                visible={modalLoaderVisible}
            />
            <ModalConfirmarAccion
                titulo={"¿Está seguro de que quiere cancelar la cita?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setCitaSeleccionada(null)
                    setModalConfirmarAccion(false)
                }}
                aceptar={eliminarCita}
                fuenteTexto={fuenteTexto.gantariBold}
            />
            <ModalFeedback
                titulo={"Cita eliminada"}
                feedback={"La cita se ha eliminado correctamente"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => setModalFeedbackVisible(false)}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mis citas"}
                        textInfo1={"Aquí se muestran tus próximas citas agendadas"}
                        textInfo2={"Para cancelar una cita, solo haz tap sobre ella y confirma"}
                    />

                    {citas === null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando citas...</Text>
                        </View>

                    ) : (
                        citas === undefined ? (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[styles.textInfo, { marginBottom: 10 }]}>Aun no tienes citas pendientes</Text>
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={true}
                                    replace={true}
                                    href={"../../(tabs-cliente)/(agendarCita)/"}
                                    fondo={true}
                                    fuenteTexto={fuenteTexto.gantariBold}
                                    textoBoton={"Pedir una cita"}
                                    enTab={true}
                                />
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
                                        mostrarCliente={false}
                                        datosCita={item.cita}
                                        onPress={() => {
                                            setCitaSeleccionada(item.cita.id)
                                            setModalConfirmarAccion(true)
                                        }}
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
        </Screen >
    );
}