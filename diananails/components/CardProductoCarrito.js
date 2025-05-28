import { Pressable, StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto";

// Componente CardProductoCarrito
export const CardProductoCarrito = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Obtenemos una imagen por defecto para el producto
    const productoImgDefault = require("./../assets/images/producto.png");

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorProducto: {
            backgroundColor: tema.secondaryContainer,
            borderColor: tema.onSecondaryContainer,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
        },
        productoImg: {
            width: "100%",
            height: hp(30),
            borderRadius: 10,
            marginBottom: hp(1),
            borderWidth: 1,
            borderColor: tema.onSecondaryContainer
        },
        contenedorSeccionInfoProducto: {
            flexDirection: "row",
        },
        textTituloInfoProducto: {
            textAlign: "center",
            fontSize: hp(2),
            marginBottom: hp(0.7),
            color: tema.onSecondaryContainer
        },
        textSubTituloInfoProducto: {
            fontSize: hp(2),
            color: tema.onSecondaryContainer
        },
        textInfoProducto: {
            fontSize: hp(2),
            color: tema.onSecondaryContainer
        }
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
            <Pressable style={styles.contenedorProducto}>
                <View>
                    <Image source={props.productoImg ? { uri: productoImg } : productoImgDefault} style={styles.productoImg}></Image>
                    <View style={{ gap: hp(1) }}>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Producto: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>{props.nombreProducto}</Text>
                        </View>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Precio: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>{formatearPrecio(props.precioProducto)} €</Text>
                        </View>
                        <View style={[styles.contenedorSeccionInfoProducto, { justifyContent: "center" }]}>
                            <View>
                                <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Cantidad</Text>
                                <ContadorCantidadProducto
                                    stock={props.stock}
                                    enCarrito={0}
                                    onIncrementar={props.onIncrementar}
                                    onDecrementar={props.onDecrementar}
                                    cantidad={props.cantidad}
                                />
                            </View>
                        </View>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Subtotal: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>{formatearPrecio(props.subtotal)} €</Text>
                        </View>
                        <View style={[styles.contenedorSeccionInfoProducto, { flexDirection: "column" }]}>
                            <BotonTexto
                                botonNavegacion={true}
                                fondo={true}
                                tipoError={true}
                                fuenteTexto={props.fuenteTextoBold}
                                textoBoton={"Eliminar"}
                                onPress={props.onEliminar}
                            />
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
