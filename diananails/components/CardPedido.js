import { Pressable, StyleSheet, Text, View, FlatList } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardProductoPedido } from "./CardProductoPedido";
import { ImagenNombre } from "./../components/ImagenNombre"

// Componente CardPedido
export const CardPedido = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
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
                style={styles.containerPedido}
                onPress={props.cancelarPedido == true ? props.onPress : undefined}
            >
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
                    {/*<View style={{ gap: hp(1.7) }}>
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
                    </View>*/}

                    <FlatList
                        data={props.productos}
                        style={{ gap: 10 }}
                        renderItem={({ item }) =>
                            <CardProductoPedido
                                nombre={item.nombre}
                                cantidad={item.cantidad}
                                precio={item.precio}
                                subtotal={item.precio * item.cantidad}
                            />
                        }
                        scrollEnabled={false}
                    ></FlatList>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Fecha del pedido</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>{props.fecha.split(' ')[0]}</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Fecha de entrega estimada</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>{new Date(new Date(props.fecha).setDate(new Date(props.fecha).getDate() + 5)).toISOString().split('T')[0]}</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Estado del pedido</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>{props.estado}</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={styles.containerSeccionPedido}>
                    <Text style={styles.textTitleSeccionPedido}>Metodo de pago</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>{props.metodoPago}</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View style={[styles.containerSeccionPedido, { marginBottom: 0 }]}>
                    <Text style={styles.textTitleSeccionPedido}>Total</Text>
                    <View>
                        <Text style={styles.textInfoPedido}>{formatearPrecio(props.total)} €</Text>
                    </View>
                </View>
                
            </Pressable>
        </View>
    )
}
