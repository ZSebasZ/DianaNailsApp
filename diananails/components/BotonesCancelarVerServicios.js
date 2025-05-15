import { View, StyleSheet } from "react-native";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";

export const BotonesCancelarVerServicios = (props) => {

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

    return (
        <View>
            <View style={styles.contenedorBotonVerServicios}>
                <BotonIcono
                    fondo={true}
                    nombreIcono={"assistant"}
                    conBurbuja={true}
                    fuenteTexto={fuenteTexto.gantariRegular}
                />
            </View>
            <View style={styles.contenedorBotonCancelarCita}>
                <BotonIcono
                    fondo={true}
                    nombreIcono={"trash-can"}
                    esEliminar={true}
                />
            </View>
        </View>
    )
}




