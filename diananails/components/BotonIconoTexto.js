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

export const BotonIconoTexto = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        boton: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: wp(1),
            backgroundColor: props.fondo ? tema.primary : tema.background,
            borderWidth: 1,
            borderColor: tema.primary,
            borderRadius: 10
        },
        iconoBoton: {
            color: props.fondo ? tema.onPrimary : tema.onBackground,
        },

        iconoBotonInicioScreen: {
            fontSize: hp(4)
        },
        textBotonInicioScreen: {
            fontSize: hp(3.5),
            color: props.fondo ? tema.onPrimary : tema.onBackground,
        },

        
    })

    return (
        props.esLink ? (
            <Link href={props.href} asChild>
                <Pressable
                    style={styles.boton}
                >
                    <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, styles.iconoBotonInicioScreen]} />
                    <Text style={[props.fuenteTexto, styles.textBotonInicioScreen]}>{props.textoBoton}</Text>
                </Pressable>
            </Link>
        ) : (
            <Pressable
                style={styles.boton}
            >
                <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, styles.iconoBotonInicioScreen]} />
                <Text style={[props.fuenteTexto, styles.textBotonInicioScreen]}>{props.textoBoton}</Text>
            </Pressable>
        )
    )
}




