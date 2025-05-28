import { StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Componente CardProductoPedido
export const CardProductoPedido = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
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

    // Funcion que formatea el precio
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

    // Renderizamos el componente
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
