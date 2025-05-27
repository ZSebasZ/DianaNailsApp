import { View, useColorScheme, FlatList, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { fechaHoraStyles } from "../styles/fechaHoraStyles";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { ListaDropdown } from "../components/ListaDropdown";
import { useContext, useEffect, useState } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { BotonTexto } from "../components/BotonTexto";
import { obtenerHorasManicuristasDisponibles } from "../api/AgendarCitaController";
import { AuthContext } from "../contexts/authContext";
import { ModalServiciosSelec } from "../components/ModalServiciosSelec";


LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
    today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

//Pantalla de Login
export const FechaHoraCitaScreen = () => {

    const { usuario } = useContext(AuthContext)
    const { serviciosSeleccionados, subtotal, fecha, seleccionarFecha, hora, manicuristas, seleccionarHora, resetHoraManicuristas, setPasoAgendamiento } = useContext(AgendarCitaContext)


    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(fechaHoraStyles);
    const tema = useThemedStyles()

    const [horasManicuristas, setHorasManicuristas] = useState(null)
    const [modalServiciosSelec, setModalServiciosSelec] = useState(false)


    const diaSeleccionado = async (dia) => {
        const fecha = new Date(dia.dateString);
        const diaSemana = fecha.getDay(); // 0: Domingo, 6: Sábado


        if (diaSemana === 0 || diaSemana === 6) {
            return;
        }

        // day.dateString tiene la fecha en formato 'YYYY-MM-DD'
        //console.log('Fecha seleccionada:', dia.dateString);
        //setFechaSeleccionada(day.dateString);
        seleccionarFecha(dia.dateString)
    };

    useEffect(() => {
        if (fecha != null) {
            const cargarHoras = async () => {
                setHorasManicuristas(null)
                const idsServicios = serviciosSeleccionados.map(servicio => servicio.id);
                const respuesta = await obtenerHorasManicuristasDisponibles({ idCliente: usuario.datosUsuario.id, fecha: fecha, servicios: idsServicios }) // esto ya es el array correcto
                setHorasManicuristas(Object.values(respuesta));
                //console.log(Object.values(respuesta))
                //setHorasManicuristas({ mensaje: "noHoras" })
                //console.log("cambiamos horas")
            };

            cargarHoras();
            resetHoraManicuristas()
        }
    }, [fecha])

    useEffect(() => {
        if (fecha == null) {
            console.log("tin")
            seleccionarFecha(obtenerFechaActual())
        }
    }, [])


    const obtenerFechaActual = () => {
        const hoy = new Date();
        const diaSemana = hoy.getDay(); // 0 = domingo, 6 = sábado

        if (diaSemana === 6) {
            // Sábado: sumamos 2 días
            hoy.setDate(hoy.getDate() + 2);
        } else if (diaSemana === 0) {
            // Domingo: sumamos 1 día
            hoy.setDate(hoy.getDate() + 1);
        }

        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    };



    const hoy = new Date();

    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');

    const fechaMin = `${yyyy}-${mm}-${dd}`; // hoy

    // Fecha max 30 días después
    const fechaMaxDate = new Date(hoy);
    fechaMaxDate.setDate(hoy.getDate() + 30);

    const yyyyMax = fechaMaxDate.getFullYear();
    const mmMax = String(fechaMaxDate.getMonth() + 1).padStart(2, '0');
    const ddMax = String(fechaMaxDate.getDate()).padStart(2, '0');

    const fechaMax = `${yyyyMax}-${mmMax}-${ddMax}`;

    return (
        <Screen enTab={true}>
            <ModalServiciosSelec
                editable={false}
                servicios={serviciosSeleccionados}
                visible={modalServiciosSelec}
                cerrar={() => { setModalServiciosSelec(false) }}
                
            />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Fecha"}
                        textInfo1={"Selecciona la fecha de la cita"}
                    />
                    <View style={styles.contenedorCalendarioPicker}>
                        <Calendar
                            current={obtenerFechaActual()}
                            minDate={fechaMin}
                            maxDate={fechaMax}
                            onDayPress={diaSeleccionado}
                            theme={{
                                arrowColor: tema.primary,
                                textSectionTitleColor: tema.primary,
                                todayTextColor: tema.primary,
                                monthTextColor: tema.primary,
                                selectedDayTextColor: tema.onPrimary,
                                selectedDayBackgroundColor: tema.primary
                            }}
                            markedDates={{
                                [fecha]: {
                                    selected: true,
                                },
                            }}
                        />
                    </View>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Hora"}
                        textInfo1={"Selecciona la hora de la cita"}
                    />
                    {horasManicuristas == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando horas disponibles...</Text>
                        </View>
                    ) : horasManicuristas[0] === "noHoras" ? (

                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo, { textAlign: "center" }]}>No tenemos manicuristas diponibles para la fecha seleccionada. Intentelo de nuevo seleccionando otra fecha</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={horasManicuristas}
                            numColumns={4}

                            contentContainerStyle={{
                                gap: 20,
                                marginBottom: 80,
                            }}
                            columnWrapperStyle={{
                                justifyContent: "center",
                                gap: 20
                            }}
                            renderItem={({ item }) =>
                                <BotonTexto
                                    botonNavegacion={true}
                                    esLink={false}
                                    fondo={hora.idHora === item.idHora}
                                    fuenteTexto={fuenteTexto.gantariRegular}
                                    textoBoton={item.hora}
                                    onPress={() => seleccionarHora(item, item.manicuristas)}
                                />
                            }
                            scrollEnabled={false}

                        ></FlatList>
                    )}
                    {/*<ListaDropdown
                        items={items}
                        fuenteTexto={fuenteTexto.gantariRegular}
                    />*/}
                </ScrollView>
            </View>
            <BotonesCancelarVerServicios 
                verServicios={() => {setModalServiciosSelec(true)}}
            />
            <BarraResumen
                onPress={() => {
                    setPasoAgendamiento(3)
                }}
                onPressAtras={() => {
                    setPasoAgendamiento(1)
                }}
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                btnSiguienteDeshabilitado={hora.hora == null ? true : false}
                subtotal={subtotal}
                hrefSiguiente={"/navegacion/cliente/(tabs-cliente)/(agendarCita)/(screens)/elegirManicuristaMetodoPago"}
            />
        </Screen>
    );
}