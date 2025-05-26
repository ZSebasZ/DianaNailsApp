import { View, useColorScheme, ScrollView, FlatList, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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


//Pantalla de Login
export const CitasClienteScreen = () => {

    const { usuario } = useContext(AuthContext)
    const [citas, setCitas] = useState(null)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [citaSeleccionada, setCitaSeleccionada] = useState(null)

    const fuenteTexto = fuenteTextoStyles();
    const manicurista = require("./../assets/images/manicurista.jpg")
    //Estilos
    const styles = useThemedStyles(citasClienteStyles);

    const cargarCitas = async () => {
        const respuesta = await obtenerCitas(usuario.datosUsuario.id)// esto ya es el array correcto
        setCitas(respuesta.citas);
        //console.log(respuesta.citas)
        //console.log(respuesta.citas)
    };

    useEffect(() => {
        cargarCitas();
    }, [])



    const eliminarCita = async () => {
        try {
            setModalConfirmarAccion(false)
            setModalLoaderVisible(true)
            //console.log(usuario.datosUsuario.id, citaSeleccionada)
            const respuesta = await cancelarCita(usuario.datosUsuario.id, citaSeleccionada)
            console.log(respuesta)
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
            await cargarCitas();
            setCitaSeleccionada(null)
        } catch (error) {
            console.error("Error al borrar la cita")
        }
    }

    return (
        <Screen enTab={true}>
            <ModalLoader
                visible={modalLoaderVisible}
            />
            <ModalConfirmarAccion
                titulo={"¿Está seguro que quiere cancelar la cita?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setCitaSeleccionada(null)
                    setModalConfirmarAccion(false)
                }}
                aceptar={eliminarCita}
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
                        textInfo1={"Aqui se muestran las próximas citas que tienes agendadas"}
                        textInfo2={"Para cancelar una cita, solo haga click sobre ella"}
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