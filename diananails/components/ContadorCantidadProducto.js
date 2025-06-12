import { Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";

// Componente ContadorCantidadProducto
export const ContadorCantidadProducto = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        containerCantidadProducto: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: wp(7)
        },
        botonCantidadProducto: {
            /*backgroundColor: tema.primary,*/
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

    // Función para formatear el tiempo
    function formatearTiempo(minutos) {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        if (horas > 0 && mins > 0) return `${horas} hora${horas > 1 ? 's' : ''} ${mins} minutos`;
        if (horas > 0) return `${horas} hora${horas > 1 ? 's' : ''}`;
        return `${mins} minutos`;
    }

    // Renderizamos el componente
    return (
        <View style={styles.containerCantidadProducto}>

            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? tema.primary + "CC" : tema.primary,
                    },
                    styles.botonCantidadProducto, { opacity: (props.stock == 0 || props.enCarrito == 1 || props.cantidad == 1 || props.tiempoRequerido == 1) ? 0.5 : 1 },
                ]}
                disabled={(props.stock == 0 || props.enCarrito == 1 || props.cantidad == 1 || props.tiempoRequerido == 1) ? true : false}
                onPress={props.onDecrementar}
            >
                <Icono IconComponent={MaterialCommunityIcons} name="minus" onPrimary={false} style={[styles.iconoCantidadProducto]} />
            </Pressable>
            {props.esTiempoRequerido ?
                <Text style={styles.textInfoProducto}>{formatearTiempo(props.tiempoRequerido * 15)}</Text>
                :
                <Text style={styles.textInfoProducto}>{props.cantidad}</Text>
            }

            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? tema.primary + "CC" : tema.primary,
                    },
                    styles.botonCantidadProducto, { opacity: (props.stock == 0 || props.enCarrito == 1 || props.cantidad == 5 || ((props.cantidad == props.stock) && (props.cantidad && props.stock)) || ((props.tiempoRequerido == props.maxTiempo) && props.tiempoRequerido && props.maxTiempo)) ? 0.5 : 1 },
                ]}
                disabled={(props.stock == 0 || props.enCarrito == 1 || props.cantidad == 5 || ((props.cantidad == props.stock) && (props.cantidad && props.stock)) || ((props.tiempoRequerido == props.maxTiempo) && props.tiempoRequerido && props.maxTiempo)) ? true : false}
                onPress={props.onIncrementar}
            >
                <Icono IconComponent={MaterialCommunityIcons} name="plus" onPrimary={false} style={[styles.iconoCantidadProducto]} />
            </Pressable>
        </View>

    )
}
