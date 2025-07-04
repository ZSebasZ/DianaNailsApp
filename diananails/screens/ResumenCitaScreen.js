import { View, Text, ScrollView, FlatList, BackHandler } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState } from "react";
import { resumenCitaStyles } from "../styles/resumenCitaStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { CardManicurista } from "../components/CardManicurista";
import { CardServicioResumen } from "../components/CardServicioResumen";
import { useContext, useCallback } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { AuthContext } from "../contexts/authContext";
import { agendarCita } from "../api/AgendarCitaController";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { ModalErrorAPI } from "../components/ModalErrorAPI";
import { useRootNavigationState, useFocusEffect, router } from "expo-router";




//Pantalla de ResumenCita
export const ResumenCitaScreen = () => {

    // Logica para pantalla anterior
    const rootState = useRootNavigationState();

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (!rootState) return false;

                const currentRoute = rootState.routes[rootState.index];

                console.log(currentRoute.name);

                if (currentRoute.name === "navegacion/cliente") {
                    setPasoAgendamiento(3)
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
    const styles = useThemedStyles(resumenCitaStyles);

    // Usamos el contexto de autenticacion y de agendar cita
    const { usuario } = useContext(AuthContext)
    const { subtotal, serviciosSeleccionados, tiempoTotal, fecha, hora, manicurista, metodoPago, reiniciarContexto, setPasoAgendamiento } = useContext(AgendarCitaContext)

    // Funcion que calcula el tiempo requerido
    const calcularTiempoRequerido = (lapsos) => {
        const totalMinutos = lapsos * 15;
        const horas = Math.floor(totalMinutos / 60);
        const minutos = totalMinutos % 60;

        let resultado = "";
        if (horas > 0) {
            resultado += `${horas} hora${horas > 1 ? "s" : ""}`;
        }
        if (minutos > 0) {
            if (horas > 0) resultado += " y ";
            resultado += `${minutos} minuto${minutos > 1 ? "s" : ""}`;
        }

        return resultado || "0 minutos";
    };

    // Funcion para agendar la cita
    const agendarCitaCliente = async () => {
        try {
            setModalLoaderVisible(true)
            const idsServicios = serviciosSeleccionados.map(servicio => servicio.id);
            const respuesta = await agendarCita({
                idCliente: usuario.datosUsuario.id,
                servicios: idsServicios,
                fecha: fecha,
                idHora: hora.idHora,
                idManicurista: manicurista.idManicurista,
                precio: subtotal,
                idMetodoPago: metodoPago.idMetodoPago
            })
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }
    }

    // Estados de los modales
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)

    // Funcion que formatea la fecha
    function formatearFechaManual(fechaStr) {
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const [año, mes, dia] = fechaStr.split('-');
        return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
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

            <ModalFeedback
                titulo={"Cita agendada"}
                feedback={"Tu cita ha sido agendada correctamente"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    reiniciarContexto()
                    setModalFeedbackVisible(false)
                    setPasoAgendamiento(1)
                    //router.replace("/navegacion/cliente")

                }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Resumen de tu cita"}
                        textInfo1={"La cita se agendará con los siguientes datos"}
                    />
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Servicios</Text>

                        <FlatList
                            data={serviciosSeleccionados}
                            numColumns={1}
                            contentContainerStyle={{
                                gap: 10,
                            }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <CardServicioResumen
                                    fuenteTextoBold={fuenteTexto.gantariBold}
                                    fuenteTextoRegular={fuenteTexto.gantariRegular}
                                    nombreServicio={item.nombre}
                                    tiempoServicio={item.horas_requeridas}
                                    precioServicio={item.precio}
                                />
                            }
                            scrollEnabled={false}
                        >
                        </FlatList>

                        {/*<View style={styles.contenedorServiciosSeleccionados}>
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                            <CardServicioResumen
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                nombreServicio={"Manicura y pedicura"}
                                tiempoServicio={"1 hora y 30 minutos"}
                                precioServicio={"19.99 $"}
                            />
                        </View>*/}
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Tiempo total</Text>
                        <Text style={styles.textInfoSubSeccion}>{calcularTiempoRequerido(tiempoTotal)}</Text>
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Fecha y hora</Text>
                        <View style={styles.contenedorFechaHora}>
                            <Text style={styles.textSubTituloSubSeccion}>Fecha: </Text>
                            <Text style={styles.textInfoSubSeccion}>{formatearFechaManual(fecha)}</Text>
                        </View>
                        <View style={styles.contenedorFechaHora}>
                            <Text style={styles.textSubTituloSubSeccion}>Hora: </Text>
                            <Text style={styles.textInfoSubSeccion}>{hora.hora}</Text>
                        </View>
                    </View>
                    <View style={styles.contenedorSeccionDetalle}>
                        <Text style={styles.textTituloSubSeccion}>Manicurista</Text>
                        <View style={{ alignItems: "center" }}>
                            <CardManicurista
                                estaSeleccionada={true}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                manicuristaImg={manicurista.urlImagen}
                                nombreManicurista={manicurista.manicurista}
                                enVistaResumen={true}
                            />
                        </View>
                    </View>
                    <View style={[styles.contenedorSeccionDetalle, { paddingBottom: 70 }]}>
                        <Text style={styles.textTituloSubSeccion}>Método de pago</Text>
                        <Text style={styles.textInfoSubSeccion}>{metodoPago.metodoPago}</Text>
                    </View>

                </ScrollView>
            </View>
            <BotonesCancelarVerServicios
                esResumenScreen={true}
            />
            <BarraResumen
                onPressAtras={() => {
                    setPasoAgendamiento(3)
                }}
                botonVolver={true}
                hrefAtras={"../"}
                botonAgendarCita={true}
                onPress={agendarCitaCliente}
                esTotal={true}
                subtotal={subtotal}
            />
        </Screen>
    );
}