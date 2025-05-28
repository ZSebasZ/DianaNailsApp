import { StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto"

// Componenente CardProductoDetalles
export const CardProductoDetalles = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Obtenemos una imagen por defecto para el producto
    const productoImgDefault = require("./../assets/images/producto.png");

    // Estilos del componente
    const styles = StyleSheet.create({
        productoImg: {
            width: "90%",
            height: hp(35),
            borderRadius: 20
        },
        lineaDivisora: {
            borderTopWidth: 2,
            marginVertical: hp(2),
            borderColor: tema.primary
        },
        contenedorSeccionInfo: {
            marginBottom: hp(1)
        },
        textTituloInfoProducto: {
            color: tema.onBackground,
            fontSize: hp(2.5),
            marginBottom: hp(0.5)
        },
        textInfoProducto: {
            color: tema.onBackground,
            fontSize: hp(2)
        },

    })

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
        <View>
            <View style={{ alignItems: "center" }}>
                <Image source={props.productoImg ? { uri: productoImg } : productoImgDefault} style={styles.productoImg}></Image>
            </View>
            <View style={styles.lineaDivisora}></View>
            <View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Descripcion</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>{props.descripcion}</Text>
                </View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Precio</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>{formatearPrecio(props.precio)} €</Text>
                </View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto, { textAlign: "center" }]}>Cantidad</Text>
                    <ContadorCantidadProducto
                        stock={props.stock}
                        enCarrito={props.enCarrito}
                        onIncrementar={props.onIncrementar}
                        onDecrementar={props.onDecrementar}
                        cantidad={props.cantidad}
                    />
                </View>
                <View style={[styles.contenedorSeccionInfo, { marginTop: hp(2) }]}>
                    <BotonTexto
                        botonNavegacion={true}
                        esLink={false}
                        fondo={true}
                        enCarrito={props.enCarrito == 0 ? false : true}
                        agotado={props.agotado == 0 ? false : true}
                        fuenteTexto={props.fuenteTextoBold}
                        textoBoton={
                            props.enCarrito != 0 || props.agotado != 0
                                ? (props.agotado != 0 ? "Agotado" : "Este producto ya está en tu carrito")
                                : "Añadir al carrito"
                        }
                        onPress={props.onAnadir}
                        deshabilitado={props.agotado != 0 || props.enCarrito != 0}
                    />
                </View>
            </View>
        </View>
    )
}
