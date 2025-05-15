import { Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";



export const ContadorCantidadProducto = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        containerCantidadProducto: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: wp(7)
        },
        botonCantidadProducto: {
            backgroundColor: tema.primary,
            borderRadius: 100,
            padding: 10
        },
        iconoCantidadProducto: {
            color: tema.onPrimary,
            fontSize: hp(1.8)
        },
        textInfoProducto: {
            fontSize: hp(2),
            color: tema.onSecondaryContainer
        }

    })

    return (


        <View style={styles.containerCantidadProducto}>
            <Pressable style={styles.botonCantidadProducto}>
                <Icono IconComponent={MaterialCommunityIcons} name="minus" onPrimary={false} style={styles.iconoCantidadProducto} />
            </Pressable>
            {props.esTiempoRequerido ?
                <Text style={styles.textInfoProducto}>30 minutos</Text>
                :
                <Text style={styles.textInfoProducto}>1</Text>
            }

            <Pressable style={styles.botonCantidadProducto}>
                <Icono IconComponent={MaterialCommunityIcons} name="plus" onPrimary={false} style={styles.iconoCantidadProducto} />
            </Pressable>
        </View>

    )
}
