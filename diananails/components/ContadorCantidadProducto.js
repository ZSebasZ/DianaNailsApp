import { Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { useState } from "react";



export const ContadorCantidadProducto = (props) => {
    const tema = useThemedStyles()
    const [cantidad, setCantidad] = useState(1)

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
            
            <Pressable 
                style={[styles.botonCantidadProducto, { opacity: (props.stock == 0 || props.enCarrito == 1 || props.cantidad == 1) ? 0.5 : 1 }]}
                disabled={(props.stock == 0 || props.enCarrito == 1 || props.cantidad == 1 ) ? true : false}
                onPress={props.onDecrementar}
            >
                <Icono IconComponent={MaterialCommunityIcons} name="minus" onPrimary={false} style={[styles.iconoCantidadProducto]} />
            </Pressable>
            {props.esTiempoRequerido ?
                <Text style={styles.textInfoProducto}>30 minutos</Text>
                :
                <Text style={styles.textInfoProducto}>{props.cantidad}</Text>
            }

            <Pressable 
                style={[styles.botonCantidadProducto, { opacity: (props.stock == 0 || props.enCarrito == 1 || props.cantidad == 5 || props.cantidad == props.stock) ? 0.5 : 1 }]}
                disabled={(props.stock == 0 || props.enCarrito == 1 || props.cantidad == 5 || props.cantidad == props.stock ) ? true : false}
                onPress={props.onIncrementar}
            >
                <Icono IconComponent={MaterialCommunityIcons} name="plus" onPrimary={false} style={[styles.iconoCantidadProducto]} />
            </Pressable>
        </View>

    )
}
