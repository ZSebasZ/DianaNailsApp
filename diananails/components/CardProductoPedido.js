import { StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const CardProductoPedido = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        textInfoPedido: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariRegular",
            fontSize: hp(2)
        },
        textSubTitleInfoPedido: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariBold",
            fontSize: hp(2)
        },
    })

    function formatearPrecio(num) {
        // Formatear con dos decimales fijos
        let precio = num.toFixed(2);

        // Separar parte entera y decimal
        let [entero, decimal] = precio.split('.');

        // Asegurar que la parte entera tenga al menos dos dígitos
        if (entero.length < 2) {
            entero = '0' + entero;
        }

        return `${entero}.${decimal}`;
    }

    return (
        <View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textSubTitleInfoPedido}>Producto: </Text>
                <Text style={styles.textInfoPedido}>{props.nombre}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textSubTitleInfoPedido}>Cantidad: </Text>
                <Text style={styles.textInfoPedido}>{props.cantidad}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textSubTitleInfoPedido}>Precio: </Text>
                <Text style={styles.textInfoPedido}>{formatearPrecio(props.precio)} €</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textSubTitleInfoPedido}>Subtotal: </Text>
                <Text style={styles.textInfoPedido}>{formatearPrecio(props.subtotal)} €</Text>
            </View>
        </View>

    )
}
