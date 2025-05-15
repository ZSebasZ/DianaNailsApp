import { Pressable, StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto";



export const CardProductoCarrito = (props) => {
    const tema = useThemedStyles()

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

    return (
        <View>
            <Pressable style={styles.contenedorProducto}>
                <View>
                    <Image source={props.productoImg} style={styles.productoImg}></Image>
                    <View style={{gap: hp(1)}}>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Producto: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>Lima de grano 5</Text>
                        </View>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Precio: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>19.00 $</Text>
                        </View>
                        <View style={[styles.contenedorSeccionInfoProducto, { justifyContent: "center" }]}>
                            <View>
                                <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Cantidad</Text>
                                <ContadorCantidadProducto/>
                            </View>
                        </View>
                        <View style={styles.contenedorSeccionInfoProducto}>
                            <Text style={[props.fuenteTextoBold, styles.textSubTituloInfoProducto]}>Subtotal: </Text>
                            <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>40.00 $</Text>
                        </View>
                        <View style={[styles.contenedorSeccionInfoProducto, { flexDirection: "column" }]}>
                            <BotonTexto
                                botonNavegacion={true}
                                fondo={true}
                                tipoError={true}
                                fuenteTexto={props.fuenteTextoBold}
                                textoBoton={"Eliminar"}
                            />
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
