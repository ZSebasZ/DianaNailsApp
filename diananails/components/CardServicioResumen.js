import { View, StyleSheet, Text } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const CardServicioResumen = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedorServicio: {
            backgroundColor: tema.secondaryContainer,
            borderRadius: 10,
            padding: 10
        },
        textNombreServicio: {
            color: tema.onBackground,
            fontSize: hp(2.2)
        },
        contenedorInfoServicio: {
            flexDirection: "row"
        },
        textTituloInfoServicio: {
            color: tema.onBackground,
            fontSize: hp(1.8)
        },
        textInfoServicio: {
            color: tema.onBackground,
            fontSize: hp(1.8)
        }
    })

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

    return (
        <View style={styles.contenedorServicio}>
            <Text style={[props.fuenteTextoBold, styles.textNombreServicio]}>{props.nombreServicio}</Text>
            <View style={styles.contenedorInfoServicio}>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfoServicio]}>Tiempo requerido: </Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfoServicio]}>{calcularTiempoRequerido(props.tiempoServicio)}</Text>
            </View>
            <View style={styles.contenedorInfoServicio}>
                <Text style={[props.fuenteTextoBold, styles.textTituloInfoServicio]}>Precio: </Text>
                <Text style={[props.fuenteTextoRegular, styles.textInfoServicio]}>{formatearPrecio(props.precioServicio)} €</Text>
            </View>
        </View>
    )
}
