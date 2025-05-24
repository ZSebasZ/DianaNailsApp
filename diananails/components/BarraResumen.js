import { View, StyleSheet, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { BotonIcono } from "./BotonIcono";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "./BotonTexto";
import { useContext } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";

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

        },
        subContenedorCenter: {
            alignItems: "center",
        },
        subContenedorRight: props.hrefCarrito != null
            ? { alignItems: "flex-end" }
            : {},


        textTituloContenedorCenter: {
            fontSize: hp(2),
            color: tema.onBackground
        },
        textInfoContenedorCenter: {
            fontSize: hp(1.8),
            color: tema.onBackground
        },


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
                <Text style={[fuenteTexto.gantariRegular, styles.textInfoContenedorCenter]}>{formatearPrecio(props.subtotal)} €</Text>
            </View>

            {props.botonCarrito && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                    <BotonIcono
                        botonNavegacion={true}
                        esLink={true}
                        href={props.hrefCarrito}
                        fondo={true}
                        nombreIcono={"cart"}
                        conBurbuja={true}
                        cantidad={props.cantidadProductos}
                        fuenteTexto={fuenteTexto.gantariRegular}
                    />
                </View>
            )}

            {props.botonSiguiente && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                    <BotonTexto
                        botonNavegacion={true}
                        esLink={props.esRealizarPedido ? false : true}
                        href={props.hrefSiguiente}
                        fondo={true}
                        fuenteTexto={fuenteTexto.gantariBold}
                        textoBoton={props.esRealizarPedido ? "Realizar pedido" : "Siguiente"}
                        deshabilitado={props.btnSiguienteDeshabilitado}
                        onPress={props.onPress}
                    />
                </View>
            )}
            {props.botonAgendarCita && (
                <View style={[styles.subContenederosBarraResumen, styles.subContenedorRight]}>
                    <BotonTexto
                        botonNavegacion={true}
                        esLink={false}
                        fondo={true}
                        fuenteTexto={fuenteTexto.gantariBold}
                        textoBoton={"Agendar cita"}
                        onPress={props.onPress}
                    />
                </View>
            )}
        </View>
    )
}




