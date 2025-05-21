import { View, StyleSheet } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { useContext } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { router } from "expo-router";

export const BotonesCancelarVerServicios = (props) => {

    const { serviciosSeleccionados, reiniciarContexto } = useContext(AgendarCitaContext)

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
        router.replace("/navegacion/(tabs-cliente)/(agendarCita)/")
    }

    return (
        <View>
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
                        onPress={cancelarAgendamientoCita}
                    />
                </View>
            }
        </View>
    )
}




