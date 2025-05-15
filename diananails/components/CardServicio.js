import { Pressable, StyleSheet, Text } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { Link } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const CardServicio = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedorServicio: {
            borderColor: tema.primary,
            backgroundColor: props.estaSeleccionado ? tema.primary : tema.background,
            borderWidth: 2,
            borderRadius: 10,
            padding: hp(1),
            width: wp(42),
        },
        textTituloServicio: {
            color: props.estaSeleccionado ? tema.onPrimary : tema.onBackground,
            fontSize: hp(2.5),
            borderBottomWidth: 1,
            borderColor: tema.primary,
            paddingBottom: hp(1)
        },
        textTituloInfo: {
            color: props.estaSeleccionado ? tema.onPrimary : tema.onBackground,
            fontSize: hp(2),
            marginTop: hp(1)
        },
        textInfo: {
            color: props.estaSeleccionado ? tema.onPrimary : tema.onBackground,
            fontSize: hp(2)
        },

    })

    return (
        props.esLink ? (
            <Link href={props.href} asChild style={[styles.contenedorServicio]}>
                <Pressable>
                    <Text style={[props.fuenteTextoBold, styles.textTituloServicio]}>{props.tituloServicio}</Text>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Tiempo requerido</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.tiempoServicio}</Text>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Precio</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.precioServicio}</Text>
                </Pressable>
            </Link>
        ) : (
            <Pressable style={[styles.contenedorServicio]}>
                <Text style={[props.fuenteTextoBold, styles.textTituloServicio]}>{props.tituloServicio}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Tiempo requerido</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.tiempoServicio}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Precio</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.precioServicio}</Text>
            </Pressable>
        )
    )
}
