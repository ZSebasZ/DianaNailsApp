import { Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardProductoPedido } from "./CardProductoPedido";
import { ImagenNombre } from "./../components/ImagenNombre"



export const CardPedido = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        containerPedido: {
            backgroundColor: tema.secondaryContainer,
            padding: 10,
            borderRadius: 10,
        },
        lineaDivisora: {
            borderTopWidth: 1,
            borderColor: tema.onSecondaryContainer,
            marginVertical: hp(1)
        },
        textTitleSeccionPedido: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariBold",
            fontSize: hp(2.3)
        },
        textInfoPedido: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariRegular",
            fontSize: hp(2)
        },
        textSubTitleInfoPedido: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariBold",
            fontSize: hp(2)
        },

    })

    return (
        <View>
            <Pressable style={styles.containerPedido}>
                {props.mostrarCliente && (
                    <>
                        <View>
                            <Text style={[styles.textTitleSeccionPedido, { marginBottom: 5 }]}>Cliente</Text>
                            <ImagenNombre
                                imagen={props.clienteImg}
                                nombre={props.clienteNombre}
                                textNormal={true}
                            />
                        </View>
                        <View style={styles.lineaDivisora}></View>
                    </>
                )}
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Productos</Text>
                    <View style={{ gap: hp(1.7) }}>
                        <CardProductoPedido
                            nombre={"Lima de grano 5"}
                            cantidad={3}
                            precio={"19.99 $"}
                            subtotal={"45.99 $"}
                        />
                        <CardProductoPedido
                            nombre={"Lima de grano 5"}
                            cantidad={3}
                            precio={"19.99 $"}
                            subtotal={"45.99 $"}
                        />
                        <CardProductoPedido
                            nombre={"Lima de grano 5"}
                            cantidad={3}
                            precio={"19.99 $"}
                            subtotal={"45.99 $"}
                        />
                        <CardProductoPedido
                            nombre={"Lima de grano 5"}
                            cantidad={3}
                            precio={"19.99 $"}
                            subtotal={"45.99 $"}
                        />
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Fecha del pedido</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>10/10/2025</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Fecha de entrega estimada</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>10/10/2025</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Estado del pedido</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>Pendiente</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={[styles.containerSeccionPedido, { marginBottom: 0 }]}>
                    <Text style={styles.textTitleSeccionPedido}>Total</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>87.99 $</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
