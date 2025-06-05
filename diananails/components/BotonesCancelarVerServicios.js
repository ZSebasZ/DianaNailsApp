import { View, StyleSheet } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { useContext, useState } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { ModalConfirmarAccion } from "./ModalConfirmarAccion";

// Componente BotonesCancelarVerServicios
export const BotonesCancelarVerServicios = (props) => {

    // Usamos el contexto de agendar cita
    const { serviciosSeleccionados, reiniciarContexto, setPasoAgendamiento } = useContext(AgendarCitaContext)

    // Modal para confirmar accion
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)

    // Obtenemos las fuentes
    const fuenteTexto = fuenteTextoStyles();

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorBotonCancelarCita: {
            position: "absolute",
            bottom: 5,
            right: 5
        },
        contenedorBotonVerServicios: {
            position: "absolute",
            bottom: 5,
            left: 5
        },
    })

    // Funcion que cancela el agendamiento de la cita
    const cancelarAgendamientoCita = () => {
        reiniciarContexto()
        setPasoAgendamiento(1)
    }

    // Renderizamos el componente
    return (
        <View>
            <ModalConfirmarAccion
                titulo={"¿Está seguro que desea eliminar todo el progreso de la cita que esta agendando?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setModalConfirmarAccion(false)
                }}
                aceptar={() => {
                    cancelarAgendamientoCita()
                    setModalConfirmarAccion(false)
                }}
                fuenteTexto={fuenteTexto.gantariBold}
            />

            <View style={styles.contenedorBotonVerServicios}>
                {!props.esResumenScreen && (
                    <BotonIcono
                        fondo={true}
                        nombreIcono={"assistant"}
                        conBurbuja={true}
                        cantidad={serviciosSeleccionados.length}
                        fuenteTexto={fuenteTexto.gantariRegular}
                        onPress={props.verServicios}
                    />
                )}
            </View>
            {serviciosSeleccionados.length != 0 &&
                <View style={styles.contenedorBotonCancelarCita}>
                    <BotonIcono
                        fondo={true}
                        nombreIcono={"trash-can"}
                        esEliminar={true}
                        onPress={() => {
                            setModalConfirmarAccion(true)
                        }}
                    />
                </View>
            }
        </View>
    )
}




