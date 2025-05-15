import { StyleSheet, Text, Image, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import { ContadorCantidadProducto } from "./ContadorCantidadProducto"

export const CardProductoDetalles = (props) => {
    const tema = useThemedStyles()

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

    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <Image source={props.producto} style={styles.productoImg}></Image>
            </View>
            <View style={styles.lineaDivisora}></View>
            <View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Descripcion</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>Hklklfj sd fd sflsd lkjsdlk fj djfks d fsda flsjd fds sd kjhg kd fkjsd kfjsdfkjhds kjhfdskj hfksjd fjksd jk jk sdjkfsdkjfsd jkfjk sdjk hfjksd hfjk sdjksdf jksdfjk hsdkj fhsdkj hfsdjk fkjsd fkjds</Text>
                </View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto]}>Precio</Text>
                    <Text style={[props.fuenteTextoRegular, styles.textInfoProducto]}>12.99 $</Text>
                </View>
                <View style={styles.contenedorSeccionInfo}>
                    <Text style={[props.fuenteTextoBold, styles.textTituloInfoProducto, { textAlign: "center" }]}>Cantidad</Text>
                    <ContadorCantidadProducto />
                </View>
                <View style={[styles.contenedorSeccionInfo, {marginTop: hp(2)}]}>
                    <BotonTexto
                        botonNavegacion={true}
                        esLink={false}
                        fondo={true}
                        enCarrito={props.enCarrito == null ? false : true}
                        agotado={props.agotado == null ? false : true}
                        fuenteTexto={props.fuenteTextoBold}
                        textoBoton={
                            props.enCarrito != null || props.agotado != null
                                ? (props.agotado != null ? "Agotado" : "Este producto ya está en tu carrito")
                                : "Añadir al carrito"
                        }
                    />
                </View>
            </View>
        </View>
    )
}
