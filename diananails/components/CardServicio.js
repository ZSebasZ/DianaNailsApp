import { Pressable, StyleSheet, Text } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { Link, router } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Componente CardServicio
export const CardServicio = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorServicio: {
            /*borderColor: tema.primary,*/
            /*backgroundColor: props.estaSeleccionado ? tema.primary : tema.background,*/
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

    // Función para calcular el tiempo requerido
    const calcularTiempoRequerido = (lapsos) => {
        const totalMinutos = lapsos * 15;
        const horas = Math.floor(totalMinutos / 60);
        const minutos = totalMinutos % 60;

        let resultado = "";
        if (horas > 0) {
            resultado += `${horas} hora${horas > 1 ? "s" : ""}`;
        }
        if (minutos > 0) {
            if (horas > 0) resultado += " y ";
            resultado += `${minutos} minuto${minutos > 1 ? "s" : ""}`;
        }

        return resultado || "0 minutos";
    };

    // Funcion que formatea el precio
    function formatearPrecio(num) {
        // Formatear con dos decimales fijos
        let precio = num.toFixed(2);

        // Separar parte entera y decimal
        let [entero, decimal] = precio.split('.');

        // Asegurar que la parte entera tenga al menos dos dígitos
        if (entero.length < 2) {
            entero = '0' + entero;
        }

        return `${entero}.${decimal}`;
    }

    // Renderizamos el componente
    return (
        props.esLink ? (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.estaSeleccionado ? tema.primary + "CC" : tema.primary + "80") : (props.estaSeleccionado ? tema.primary : tema.background),
                        borderColor: pressed ? (props.estaSeleccionado ? tema.primary + "CC" : tema.primary) : (tema.primary)
                    },
                    styles.contenedorServicio,
                ]}
                onPress={() => {
                    props.onPress?.()
                    router.push(props.href)
                }}
            >
                <Text style={[props.fuenteTextoBold, styles.textTituloServicio]}>{props.servicio.nombre}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Tiempo requerido</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{calcularTiempoRequerido(props.servicio.horas_requeridas)}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Precio</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{formatearPrecio(props.servicio.precio)} €</Text>
            </Pressable>
        ) : (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? (props.estaSeleccionado ? tema.primary + "CC" : tema.primary + "80") : (props.estaSeleccionado ? tema.primary : tema.background),
                        borderColor: pressed ? (props.estaSeleccionado ? tema.primary + "CC" : tema.primary) : (tema.primary)
                    },
                    styles.contenedorServicio,
                ]}
                onPress={props.onPress}
            >
                <Text style={[props.fuenteTextoBold, styles.textTituloServicio]}>{props.servicio.nombre}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Tiempo requerido</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{calcularTiempoRequerido(props.servicio.horas_requeridas)}</Text>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfo]}>Precio</Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{formatearPrecio(props.servicio.precio)} €</Text>
            </Pressable>
        )
    )
}
