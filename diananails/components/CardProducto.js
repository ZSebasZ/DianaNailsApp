import { Pressable, StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { Link, router } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";

// Componente CardProducto
export const CardProducto = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Obtenemos una imagen por defecto para el producto
    const productoImgDefault = require("./../assets/images/producto.png");

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorProducto: {
            borderColor: tema.primary,
            borderWidth: 2,
            borderRadius: 10,
            width: wp(40),
            flex: 1
        },
        productoImg: {
            width: "100%",
            height: hp(20),
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
        },
        contenedorInfoProducto: {
            padding: 10,
            flex: 1
        },
        textTituloProducto: {
            color: tema.onBackground,
            fontFamily: "GantariBold",
            fontSize: hp(2),
            marginBottom: hp(0.5)
        },
        textPrecioProducto: {
            color: tema.onBackground,
            fontFamily: "GantariRegular",
            fontSize: hp(2),
            marginBottom: hp(1)
        },
        contenedorBotonAccionProducto: {
            flex: 1,
            justifyContent: "flex-end",
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
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? tema.primary + "80" : tema.backgroundColor,
                    },
                    styles.contenedorProducto,
                ]}
                onPress={() => {
                    router.push(props.href);
                }}
            >
                <Image source={props.productoImg ? { uri: props.productoImg } : productoImgDefault} style={styles.productoImg}></Image>
                <View style={styles.contenedorInfoProducto}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloProducto]}>{props.nombre}</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textPrecioProducto]}>{formatearPrecio(props.precio)} €</Text>

                    <View style={styles.contenedorBotonAccionProducto}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={true}
                            deshabilitado={props.enCarrito != 0 || props.agotado != 0}
                            enCarrito={props.enCarrito == 0 ? false : true}
                            agotado={props.agotado == 0 ? false : true}
                            fuenteTexto={props.fuenteTextoBold}
                            textoBoton={
                                props.enCarrito != 0 || props.agotado != 0
                                    ? (props.agotado != 0 ? "Agotado" : "Producto en carrito")
                                    : props.vistaAdmin ? "En stock" : "Añadir"
                            }
                            onPress={props.onAnadir}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
