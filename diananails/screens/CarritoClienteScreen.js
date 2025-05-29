import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { carritoClienteStyles } from '../styles/carritoClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProductoCarrito } from "../components/CardProductoCarrito";
import { useEffect, useState, useContext } from "react";
import { useCarrito } from "../contexts/carritoContext";
import { actualizarCarritoCantidadProducto, hacerPedidoCarrito, vaciarCarrito } from "../api/CarritoController";
import { AuthContext } from "../contexts/authContext";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { router } from "expo-router";
import { BotonIcono } from "../components/BotonIcono";
import { ModalConfirmarAccion } from "../components/ModalConfirmarAccion";
import { ModalUltDetallesPedido } from "../components/ModalUltDetallesPedido";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de CarritoCliente
export const CarritoClienteScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(carritoClienteStyles);

    // Usamos el contexto de autenticación y del carrito
    const { usuario } = useContext(AuthContext)
    const { carritoProductos, dispatch } = useCarrito()

    // Estados
    const [subtotal, setSubtotal] = useState(0)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalUltDetallesPedido, setModalUltDetallesPedido] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Metodos de pago
    const metodosPago = [
        {
            idMetodoPago: 3,
            metodoPago: "Efectivo (contra entrega)"
        },
        {
            idMetodoPago: 2,
            metodoPago: "Tarjeta"
        }
    ]

    // Estado para almacenar el metodo de pago
    const [metodoPagoSelec, setMetodoPagoSelec] = useState({ idMetodoPago: null, metodoPago: null })

    // Metodo para calcular el subtotal
    useEffect(() => {
        setSubtotal(calcularTotal(carritoProductos))
    }, [])

    // Metodo para calcular el subtotal
    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    };

    // Metodo para calcular el subtotal cuando cambia el carrito
    useEffect(() => {
        setSubtotal(calcularTotal(carritoProductos))
    }, [carritoProductos])

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <ModalLoader
                visible={modalLoaderVisible}
            />

            <ModalFeedback
                titulo={"Pedido realizado"}
                feedback={"Tu pedido se ha realizado con exito y se encuentra pendiente de envio"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalFeedbackVisible(false)
                    router.push("../")
                }}
            />

            <ModalConfirmarAccion
                titulo={"¿Está seguro que quiere vaciar el carrito?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setModalConfirmarAccion(false)
                }}
                aceptar={async () => {
                    try {
                        setModalConfirmarAccion(false)
                        setModalLoaderVisible(true)
                        await vaciarCarrito(usuario.datosUsuario.id_carrito)
                        dispatch({ type: 'VACIAR_CARRITO' })
                        setModalLoaderVisible(false)
                    } catch (error) {
                        setModalLoaderVisible(false)
                        setModalErrorAPI(true)
                    }

                }}
            />
            <ModalUltDetallesPedido
                direccionDeEnvio={usuario.datosUsuario.direccion_envio}
                metodosPago={metodosPago}
                metodoPagoSelec={metodoPagoSelec}
                setMetodoPago={setMetodoPagoSelec}
                visible={modalUltDetallesPedido}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setModalUltDetallesPedido(false)
                    setMetodoPagoSelec({ idMetodoPago: null, metodoPago: null })
                }}
                aceptar={async () => {
                    try {
                        setModalUltDetallesPedido(false)
                        setModalLoaderVisible(true)
                        await hacerPedidoCarrito(usuario.datosUsuario.id_carrito, usuario.datosUsuario.id, metodoPagoSelec.idMetodoPago, subtotal)
                        dispatch({ type: 'HACER_PEDIDO' })
                        setModalLoaderVisible(false);
                        setModalFeedbackVisible(true)
                    } catch (error) {
                        setModalLoaderVisible(false)
                        setModalErrorAPI(true)
                    }

                }}
            />

            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mi carrito"}
                        textInfo1={"Productos en mi carrito"}
                    />
                    {carritoProductos.length == 0 ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>No hay productos en tu carrito</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={carritoProductos}
                            contentContainerStyle={{
                                gap: 20,
                                marginBottom: 70
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
                                            try {
                                                await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, 1)
                                                dispatch({ type: 'ANADIR_PRODUCTO', payload: { ...item } })
                                            } catch (error) {
                                                setModalLoaderVisible(false)
                                                setModalErrorAPI(true)
                                            }

                                        }
                                    }}
                                    onDecrementar={async () => {
                                        if (item.cantidad > 1) {
                                            try {
                                                await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, -1)
                                                dispatch({ type: 'QUITAR_CANTIDAD', payload: { ...item } })
                                            } catch (error) {
                                                setModalErrorAPI(true)
                                            }

                                        }
                                    }}
                                    onEliminar={async () => {
                                        try {
                                            await actualizarCarritoCantidadProducto(usuario.datosUsuario.id_carrito, item.id_producto, 0)
                                            dispatch({ type: 'ELIMINAR_PRODUCTO', payload: item.id_producto })
                                        } catch (error) {
                                            setModalLoaderVisible(false)
                                            setModalErrorAPI(true)
                                        }

                                    }}
                                />
                            }
                            scrollEnabled={false}
                        >
                        </FlatList>
                    )}


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
            {carritoProductos.length > 0 && (
                <View>
                    <View style={styles.contenedorBotonCancelarCita}>
                        <BotonIcono
                            fondo={true}
                            nombreIcono={"cart-remove"}
                            esEliminar={true}
                            onPress={() => {
                                setModalConfirmarAccion(true)
                            }}
                        />
                    </View>
                </View>
            )}
            <BarraResumen
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                btnSiguienteDeshabilitado={carritoProductos.length == 0 ? true : false}
                subtotal={subtotal}
                esRealizarPedido={true}
                onPress={() => {
                    setModalUltDetallesPedido(true)
                }}
            />
        </Screen>
    );
}