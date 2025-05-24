import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { carritoClienteStyles } from '../styles/carritoClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProductoCarrito } from "../components/CardProductoCarrito";
import { useEffect, useState, useContext } from "react";
import { useCarrito } from "../contexts/carritoContext";
import { actualizarCarritoCantidadProducto, hacerPedidoCarrito } from "../api/CarritoController";
import { AuthContext } from "../contexts/authContext";


//Pantalla de Login
export const CarritoClienteScreen = () => {

    const [subtotal, setSubtotal] = useState(0)
    const { usuario } = useContext(AuthContext)
    const { carritoProductos, dispatch } = useCarrito()

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(carritoClienteStyles);

    useEffect(() => {
        setSubtotal(calcularTotal(carritoProductos))
        console.log(carritoProductos)
        //console.log(carritoProductos)
    }, [])


    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    };

    useEffect(() => {
        setSubtotal(calcularTotal(carritoProductos))
    }, [carritoProductos])

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi carrito"}
                        textInfo1={"Productos en mi carrito"}
                    />

                    <FlatList
                        data={carritoProductos}
                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 15
                        }}
                        renderItem={({ item }) =>
                            <CardProductoCarrito
                                productoImg={item.url_imagen}
                                nombreProducto={item.nombre}
                                precioProducto={item.precio}
                                subtotal={item.precio * item.cantidad}
                                cantidad={item.cantidad}
                                stock={item.stock}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                onIncrementar={async () => {
                                    if (item.cantidad < item.stock && item.cantidad < 5) {
                                        await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, 1)
                                        dispatch({ type: 'ANADIR_PRODUCTO', payload: { ...item } })
                                    }
                                }}
                                onDecrementar={async () => {
                                    if (item.cantidad > 1) {
                                        await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, -1)
                                        dispatch({ type: 'QUITAR_CANTIDAD', payload: { ...item } })
                                    }
                                }}
                                onEliminar={async () => {
                                    await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, 0)
                                    dispatch({ type: 'ELIMINAR_PRODUCTO', payload: item.id_producto })
                                }}
                            />
                        }
                        scrollEnabled={false}
                    >
                    </FlatList>

                    {/*<View style={styles.contenedorProductosCarrito}>
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                        <CardProductoCarrito
                            productoImg={productoImg}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                        />
                    </View>*/}
                </ScrollView>
            </View>
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                subtotal={subtotal}
                esRealizarPedido={true}
                onPress={async() => { 
                    await hacerPedidoCarrito(usuario.datosUsuario.id_carrito, usuario.datosUsuario.id, 1, subtotal)
                    dispatch({ type: 'HACER_PEDIDO'})
                }}
            />
        </Screen>
    );
}