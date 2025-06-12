import { StyleSheet, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { Link, router } from "expo-router";

// Componente BotonTexto
export const BotonTexto = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        boton: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
            /*borderColor: props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))),*/
            /*backgroundColor: props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary))) : tema.backgroundColor,*/

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

    // Renderizamos el componente
    return (
        props.esLink ? (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary + "CC"))) : props.tipoError ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary))) : tema.backgroundColor,
                        borderColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary + "CC"))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary)))) : props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary)))
                    },
                    styles.boton,
                ]}
                disabled={props.deshabilitado}
                onPress={() => {
                    props.onPress?.()
                    props.replace ? router.replace(props.href) : router.push(props.href)
                }}
            >
                <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>
            </Pressable>
        ) : (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary + "CC"))) : props.tipoError ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.errorContainer : (props.enCarrito ? tema.secondaryContainer : tema.primary))) : tema.backgroundColor,
                        borderColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary+ "CC"))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary)))) : props.fondo ? (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary))) : (props.tipoError ? tema.error : (props.agotado ? tema.onErrorContainer : (props.enCarrito ? tema.onSecondaryContainer : tema.primary)))
                    },
                    styles.boton,
                ]}
                onPress={props.onPress}
                disabled={props.deshabilitado}
            >
                <Text style={[props.fuenteTexto, props.botonPrincipal && styles.textBotonPrincipal, props.botonNavegacion && styles.textBotonNavegacion]}>{props.textoBoton}</Text>

            </Pressable>
        )
    )
}




