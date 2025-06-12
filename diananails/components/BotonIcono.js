import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { Link, router } from "expo-router";

// Componente BotonIcono
export const BotonIcono = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        boton: {
            padding: props.esPerfil ? 0 : 10,

            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            /*backgroundColor: props.fondo ? tema.primary : tema.background,*/
        },
        botonEliminar: {
            /*backgroundColor: props.fondo ? tema.error : tema.errorContainer,*/
        },
        iconoBoton: {
            color: props.fondo ? tema.onPrimary : tema.onBackground,
        },
        iconoBotonEliminar: {
            color: props.fondo ? tema.errorContainer : tema.error,
        },

        iconoBoton: {
            color: props.fondo ? tema.background : tema.primary,
            fontSize: props.nombreIcono == "cart" || props.nombreIcono == "login" ? hp(3) : hp(4)
        },


        burbuja: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: -2,
            right: -2,
            width: 20,
            height: 20,
            backgroundColor: "red",
            borderRadius: 100
        },
        textBurbuja: {
            color: "white",
            fontSize: 12
        }
    })


    // Renderizamos el componente
    return (
        props.esLink ? (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.esEliminar ? tema.error + "CC" : tema.primary + "CC") : props.esEliminar ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.esEliminar ? tema.error : tema.primary) : tema.background,
                    },
                    styles.boton, props.esEliminar && styles.botonEliminar,
                ]}
                onPress={() => {
                    router.push(props.href);
                }}
            >
                {props.fotoPerfil ? (
                    <Image source={{ uri: props.fotoPerfil }} style={{ width: hp(4), height: hp(4), borderRadius: 100, resizeMode: "contain", borderWidth: 1, borderColor: tema.background }} />
                ) : (
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, props.esEliminar && styles.iconoBotonEliminar]} />

                )}
                {props.conBurbuja && (
                    <View style={styles.burbuja}>
                        <Text style={[props.fuenteTexto, styles.textBurbuja]}>{props.cantidad}</Text>
                    </View>
                )}
            </Pressable>
        ) : (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.esEliminar ? tema.error + "CC" : tema.primary + "CC") : props.esEliminar ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.esEliminar ? tema.error : tema.primary) : tema.background,
                    },
                    styles.boton, props.esEliminar && styles.botonEliminar,
                ]}
                onPress={props.onPress}
            >
                <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, props.esEliminar && styles.iconoBotonEliminar]} />
                {props.conBurbuja && (
                    <View style={styles.burbuja}>
                        <Text style={[props.fuenteTexto, styles.textBurbuja]}>{props.cantidad}</Text>
                    </View>
                )}
            </Pressable>
        )
    )
}




