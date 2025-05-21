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
            borderColor: props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))),
            backgroundColor: props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary))) : tema.backgroundColor,

            opacity: props.deshabilitado ? 0.5 : 1

        },
        textBotonPrincipal: {
            fontSize: hp(2.5),
            color: props.fondo ? (props.tipoError ? tema.onError : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.onPrimary))) : (props.tipoError ? tema.onErrorContainer : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))),

        },
        textBotonNavegacion: {
            textAlign: "center",
            fontSize: hp(2),
            color: props.fondo ? (props.tipoError ? tema.onError : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.onPrimary))) : (props.tipoError ? tema.onErrorContainer : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))),
        }
    })

    return (
        props.esLink ? (
            <Link href={props.href} asChild {...(props.replace && { replace: true })}>
                <Pressable
                    style={styles.boton}
                    disabled={props.deshabilitado}
                    onPress={props.onPress}
                >
                    <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>
                </Pressable>
            </Link>
        ) : (
            <Pressable
                style={styles.boton}
                onPress={props.onPress}
                disabled={props.deshabilitado}
            >
                <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>

            </Pressable>
        )
    )
}




