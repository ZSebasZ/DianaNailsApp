import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { useLogoPrincipal } from "../hooks/useLogoPrincipal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { botonIconoTextoStyles } from "../styles/botonIconoTextoStyles";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";
import { Link } from "expo-router";

export const BotonIcono = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        boton: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            backgroundColor: props.fondo ? tema.primary : tema.background,
        },
        botonEliminar: {
            backgroundColor: props.fondo ? tema.error : tema.errorContainer,
        },
        iconoBoton: {
            color: props.fondo ? tema.onPrimary : tema.onBackground,
        },
        iconoBotonEliminar: {
            color: props.fondo ? tema.errorContainer : tema.error,
        },

        iconoBoton: {
            color: props.fondo ? tema.background : tema.primary,
            fontSize: hp(4)
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

    return (
        props.esLink ? (
            <Link href={props.href} asChild>
                <Pressable
                    style={[styles.boton, props.esEliminar && styles.botonEliminar]}
                >
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton]} />
                    {props.conBurbuja && (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "absolute", top: -2, right: -2, width: 15, height: 15, backgroundColor: "red", borderRadius: 100 }}>
                            <Text style={{ color: "white", fontSize: 10 }}>3</Text>
                        </View>
                    )}
                </Pressable>
            </Link>
        ) : (
            <Pressable
                style={[styles.boton, props.esEliminar && styles.botonEliminar]}
                onPress={props.onPress}
            >
                <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, props.esEliminar && styles.iconoBotonEliminar]} />
                {props.conBurbuja && (
                    <View style={styles.burbuja}>
                        <Text style={[props.fuenteTexto, styles.textBurbuja]}>0</Text>
                    </View>
                )}
            </Pressable>
        )
    )
}




