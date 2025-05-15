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
                <Text style={styles.textInfoPedido}>{props.precio}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textSubTitleInfoPedido}>Subtotal: </Text>
                <Text style={styles.textInfoPedido}>{props.subtotal}</Text>
            </View>
        </View>

    )
}
