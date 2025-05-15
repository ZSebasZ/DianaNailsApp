import { Pressable, StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { Link } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";



export const CardProducto = (props) => {
    const tema = useThemedStyles()

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
            justifyContent: "center",
        },
    })

    return (
        <View>
            <Link href={props.href} asChild>
                <Pressable style={styles.contenedorProducto}>
                    <Image source={props.productoImg} style={styles.productoImg}></Image>
                    <View style={styles.contenedorInfoProducto}>
                        <Text style={[props.fuenteTextoBold, styles.textTituloProducto]}>Lima grano 5</Text>
                        <Text style={[props.fuenteTextoRegular, styles.textPrecioProducto]}>12.99 $</Text>

                        <View style={styles.contenedorBotonAccionProducto}>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={true}
                                enCarrito={props.enCarrito == null ? false : true}
                                agotado={props.agotado == null ? false : true}
                                fuenteTexto={props.fuenteTextoBold}
                                textoBoton={
                                    props.enCarrito != null || props.agotado != null
                                        ? (props.agotado != null ? "Agotado" : "Producto en carrito")
                                        : "Añadir"
                                }
                            />
                        </View>
                    </View>
                </Pressable>
            </Link>
        </View>
    )
}
