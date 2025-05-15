import { View, StyleSheet, Text } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const CardServicioResumen = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedorServicio: {
            backgroundColor: tema.secondaryContainer,
            borderRadius: 10,
            padding: 10
        },
        textNombreServicio: {
            color: tema.onBackground,
            fontSize: hp(2.2)
        },
        contenedorInfoServicio: {
            flexDirection: "row"
        },
        textTituloInfoServicio: {
            color: tema.onBackground,
            fontSize: hp(1.8)
        },
        textInfoServicio: {
            color: tema.onBackground,
            fontSize: hp(1.8)
        }
    })

    return (
        <View style={styles.contenedorServicio}>
            <Text style={[props.fuenteTextoBold, styles.textNombreServicio]}>{props.nombreServicio}</Text>
            <View style={styles.contenedorInfoServicio}>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfoServicio]}>Tiempo requerido: </Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfoServicio]}>{props.tiempoServicio}</Text>
            </View>
            <View style={styles.contenedorInfoServicio}>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfoServicio]}>Precio: </Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfoServicio]}>{props.precioServicio}</Text>
            </View>
        </View>
    )
}
