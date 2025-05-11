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

export const BotonTexto = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        boton: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: tema.primary,
            backgroundColor: props.fondo ? tema.primary : tema.background,
            
        },
        textBotonPrincipal: {
            fontSize: hp(2.5),
            color: props.fondo ? tema.onPrimary : tema.primary
        },
        textBotonNavegacion: {
            fontSize: hp(2),
            color: props.fondo ? tema.onPrimary : tema.primary
        }

    })

    return (
        props.esLink ? (
            <Link href={props.href} asChild {...(props.replace && { replace: true })}>
                <Pressable
                    style={styles.boton}
                >
                    <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>
                </Pressable>
            </Link>
        ) : (
            <Pressable
                style={styles.boton}
                onPress={props.onPress}
            >
                <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>

            </Pressable>
        )
    )
}




