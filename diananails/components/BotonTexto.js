import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
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
            borderColor: props.fondo ? (props.tipoError ? tema.error : (props.enCarrito ? tema.onSecondaryContainer : (props.agotado ? tema.onErrorContainer : tema.primary))) : tema.primary,
            backgroundColor: props.fondo ? (props.tipoError ? tema.error : (props.enCarrito ? tema.secondaryContainer : (props.agotado ? tema.errorContainer : tema.primary))) : tema.backgroundColor
        },
        textBotonPrincipal: {
            fontSize: hp(2.5),
            color: props.fondo ? (props.enCarrito ? tema.onSecondaryContainer : (props.agotado ? tema.onErrorContainer : tema.onPrimary)) : tema.primary,
            color: props.fondo ? (props.tipoError ? tema.onError : (props.enCarrito ? tema.onSecondaryContainer : (props.agotado ? tema.onErrorContainer : tema.onPrimary))) : tema.primary,

        },
        textBotonNavegacion: {
            textAlign: "center",
            fontSize: hp(2),
            color: props.fondo ? (props.enCarrito ? tema.onSecondaryContainer : (props.agotado ? tema.onErrorContainer : tema.onPrimary)) : tema.primary,
            color: props.fondo ? (props.tipoError ? tema.onError : (props.enCarrito ? tema.onSecondaryContainer : (props.agotado ? tema.onErrorContainer : tema.onPrimary))) : tema.primary,
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




