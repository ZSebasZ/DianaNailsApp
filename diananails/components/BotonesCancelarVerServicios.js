import { View, StyleSheet } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { useContext, useState } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { router } from "expo-router";
import { ModalLoader } from "./ModalLoader";
import { ModalConfirmarAccion } from "./ModalConfirmarAccion";

export const BotonesCancelarVerServicios = (props) => {

    const { serviciosSeleccionados, reiniciarContexto, setPasoAgendamiento } = useContext(AgendarCitaContext)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)


    const tema = useThemedStyles() // Acceder al contexto
    const fuenteTexto = fuenteTextoStyles();

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

    const cancelarAgendamientoCita = () => {
        reiniciarContexto()
        setPasoAgendamiento(1)
        //router.replace("/navegacion/cliente")
    }

    return (
        <View>
            <ModalConfirmarAccion
                titulo={"¿Está seguro eliminar todo el progreso de la cita que esta agendando?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setModalConfirmarAccion(false)
                }}
                aceptar={() => {
                    cancelarAgendamientoCita()
                    setModalConfirmarAccion(false)
                }}
            />

            <View style={styles.contenedorBotonVerServicios}>
                {!props.esResumenScreen && (
                    <BotonIcono
                        fondo={true}
                        nombreIcono={"assistant"}
                        conBurbuja={true}
                        cantidad={serviciosSeleccionados.length}
                        fuenteTexto={fuenteTexto.gantariRegular}
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




