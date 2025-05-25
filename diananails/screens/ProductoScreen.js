import { View, useColorScheme, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { productoStyles } from '../styles/productoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProductoDetalles } from "../components/CardProductoDetalles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { obtenerProductoDetalles } from "../api/ProductosController";
import { useCarrito } from "../contexts/carritoContext";
import { anadirCarritoProducto } from "../api/CarritoController";

//Pantalla de Login
export const ProductoScreen = (props) => {

    const { usuario } = useContext(AuthContext)
    const [producto, setProducto] = useState(null)
    const [cantidadProducto, setCantidadProducto] = useState(1)
    const { carritoProductos, dispatch } = useCarrito()
    const [subtotal, setSubtotal] = useState(0)

    const fuenteTexto = fuenteTextoStyles();

    const productoImgDefault = require("./../assets/images/manicurista.jpg")
    //Estilos
    const styles = useThemedStyles(productoStyles);

    useEffect(() => {
        const obtenerProducto = async () => {
            const respuesta = await obtenerProductoDetalles(usuario.datosUsuario.id_carrito, props.idProducto)
            setProducto(respuesta[0])
            //console.log(respuesta[0])
            setSubtotal(calcularTotal(carritoProductos))
        }
        obtenerProducto()
    }, [])

    useEffect(() => {
        setSubtotal(calcularTotal(carritoProductos))
    }, [carritoProductos])

    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    };

    return (
        <Screen enTab={true}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                {producto == null ? (
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <Text style={[styles.textInfo]}>Cargando detalles del producto...</Text>
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <SeccionEnTab
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloSeccion={producto.nombre}
                            textInfo1={"Detalles del producto"}

                        />
                        <View style={styles.contenedorProductos}>
                            <CardProductoDetalles
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                producto={productoImgDefault}
                                descripcion={producto.descripcion}
                                precio={producto.precio}
                                enCarrito={producto.enCarrito}
                                agotado={producto.agotado}
                                stock={producto.stock}
                                cantidad={cantidadProducto}
                                onIncrementar={() => {
                                    if (cantidadProducto < producto.stock && cantidadProducto < 5) {
                                        setCantidadProducto(cantidadProducto + 1)
                                    }
                                }}
                                onDecrementar={() => {
                                    if (cantidadProducto > 1) {
                                        setCantidadProducto(cantidadProducto - 1)
                                    }
                                }}
                                onAnadir={async () => {
                                    await anadirCarritoProducto(usuario.datosUsuario.id_carrito, producto.id, cantidadProducto)
                                    setProducto({ ...producto, enCarrito: 1 })
                                    dispatch({ type: 'ANADIR_PRODUCTO', payload: { id_producto: producto.id, nombre: producto.nombre, precio: producto.precio, stock: producto.stock, cantidad: cantidadProducto } })
                                }}
                            />
                        </View>
                    </ScrollView>
                )}
            </View>
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                subtotal={subtotal}
                botonCarrito={true}
                cantidadProductos={carritoProductos.length}
                hrefCarrito={"/navegacion/(clienteScreens)/(pedidosCarrito)/carritoCliente"}
            />
        </Screen >
    );
}