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
import { BotonTexto } from "./BotonTexto";

export const BarraResumen = (props) => {

    const tema = useThemedStyles() // Acceder al contexto
    const fuenteTexto = fuenteTextoStyles();

    const styles = StyleSheet.create({
        cotenedorBarraResumen: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingVertical: hp(1),
            paddingHorizontal: hp(1),
            backgroundColor: tema.background,
            borderTopWidth: 1,
            borderColor: tema.outline
        },
        subContenederosBarraResumen: {
            flex: 1,
        },
        subContenedorLeft: {
            alignItems: "flex-start",
        },
        subContenedorCenter: {
            alignItems: "center",
        },
        subContenedorRight: {
            alignItems: "flex-end",
        },

        textTituloContenedorCenter: {
            fontSize: hp(2),
            color: tema.onBackground
        },
        textInfoContenedorCenter: {
            fontSize: hp(1.8),
            color: tema.onBackground
        },


    })

    return (
        <View style={styles.cotenedorBarraResumen}>
            {props.botonVolver && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorLeft]}>
                    <BotonTexto
                            botonNavegacion={true}
                            esLink={true}
                            href={props.hrefAtras}
                            fondo={false}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Atrás"}
                        />
                </View>
            )}

            <View style={[styles.subContenederosBarraResumen, styles.subContenedorCenter]}>
                <Text style={[fuenteTexto.gantariBold, styles.textTituloContenedorCenter]}>{props.esTotal ? "Total" : "Subtotal"}</Text>
                <Text style={[fuenteTexto.gantariRegular, styles.textInfoContenedorCenter]}>00.00 $</Text>
            </View>

            {props.botonCarrito && (
                <View style={[]}>
                    <Link asChild href={"/(agendarCita)/(screens)/elegirFechaHora"}>
                        <Pressable style={[]} >
                            <Text style={[]}>Atras</Text>
                        </Pressable>
                    </Link>
                </View>
            )}

            {props.botonSiguiente && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                    <BotonTexto
                            botonNavegacion={true}
                            esLink={true}
                            href={props.hrefSiguiente}
                            fondo={true}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Siguiente"}
                        />
                </View>
            )}
            {props.botonAgendarCita && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                    <BotonTexto
                            botonNavegacion={true}
                            esLink={true}
                            replae={true}
                            href={props.hrefAgendarCita}
                            fondo={true}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Agendar cita"}
                        />
                </View>
            )}
        </View>
    )
}




