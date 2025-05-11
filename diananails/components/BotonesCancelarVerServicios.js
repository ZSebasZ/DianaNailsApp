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
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";

export const BotonesCancelarVerServicios = (props) => {

    const tema = useThemedStyles() // Acceder al contexto
    const fuenteTexto = fuenteTextoStyles();

    const styles = StyleSheet.create({
        contenedorBotonCancelarCita: {
            position: "absolute",
            bottom: 5,
            right: 5
        },
        contenedorBotonVerServicios: {
            position: "absolute",
            bottom: 5,
            left: 5
        },
    })

    return (
        <View>
            <View style={styles.contenedorBotonVerServicios}>
                <BotonIcono
                    fondo={true}
                    nombreIcono={"assistant"}
                    conBurbuja={true}
                    fuenteTexto={fuenteTexto.gantariRegular}
                />
            </View>
            <View style={styles.contenedorBotonCancelarCita}>
                <BotonIcono
                    fondo={true}
                    nombreIcono={"trash-can"}
                    esEliminar={true}
                />
            </View>
        </View>
    )
}




