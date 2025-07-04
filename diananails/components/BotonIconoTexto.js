import { StyleSheet, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";
import { useThemedStyles } from '../hooks/useThemeStyles';
import { Link, router } from "expo-router";

// Componente BotonIconoTexto
export const BotonIconoTexto = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        boton: {
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: props.enTab ? wp(2) : wp(1),
            /*backgroundColor: props.fondo ? (props.tipoError ? tema.error : tema.primary) : tema.background,*/
            borderWidth: 1,
            /*borderColor: props.tipoError ? tema.error : tema.primary,*/
            borderRadius: 10,
            opacity: props.deshabilitado ? 0.5 : 1
        },
        iconoBoton: {
            color: props.fondo ? tema.onPrimary : (props.tipoError ? tema.error : tema.primary),
        },

        iconoBotonInicioScreen: {
            fontSize: props.enTab ? hp(2.5) : hp(4)
        },
        textBotonInicioScreen: {
            fontSize: props.enTab ? hp(2) : hp(3.5),
            color: props.fondo ? tema.onPrimary : (props.tipoError ? tema.error : tema.primary),
        },


    })

    // Renderizamos el componente
    return (
        props.esLink ? (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : tema.primary + "CC") : props.tipoError ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.tipoError ? tema.error : tema.primary) : tema.background,
                        borderColor: pressed ? (props.tipoError ? tema.error + "CC" : tema.primary + "CC") : props.tipoError ? tema.error : tema.primary
                    },
                    styles.boton,
                ]}
                onPress={() => {
                    props.onPress?.();
                    router.push(props.href);
                }}
                disabled={props.deshabilitado && true}
            >
                <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, styles.iconoBotonInicioScreen]} />
                <Text style={[props.enTab ? props.fuenteTextoNormal : props.fuenteTexto, styles.textBotonInicioScreen]}>{props.textoBoton}</Text>
            </Pressable>

        ) : (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.fondo ? (props.tipoError ? tema.error + "CC" : tema.primary + "CC") : props.tipoError ? tema.error + "80" : tema.primary + "80") : props.fondo ? (props.tipoError ? tema.error : tema.primary) : tema.background,
                        borderColor: pressed ? (props.tipoError ? tema.error + "CC" : tema.primary + "CC") : props.tipoError ? tema.error : tema.primary
                    },
                    styles.boton,
                ]}
                onPress={props.onPress}
                disabled={props.deshabilitado && true}
            >
                <Icono IconComponent={MaterialCommunityIcons} name={props.nombreIcono} style={[styles.iconoBoton, styles.iconoBotonInicioScreen]} />
                <Text style={[props.enTab ? props.fuenteTextoNormal : props.fuenteTexto, styles.textBotonInicioScreen]}>{props.textoBoton}</Text>
            </Pressable>
        )
    )
}




