import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useContext, useEffect, useState, useCallback } from "react";
import { tiendaStyles } from "../styles/tiendaStyles";
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BarraResumen } from "../components/BarraResumen";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProducto } from "../components/CardProducto";
import { AuthContext } from "./../contexts/authContext"
import { obtenerProductosTienda } from "../api/ProductosController";
import { anadirCarritoProducto, obtenerCarritoProductos } from "../api/CarritoController";
import { useCarrito } from "../contexts/carritoContext";
import { useFocusEffect } from "expo-router";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de Tienda
export const TiendaScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(tiendaStyles);

    // Usamos el contexto de autenticación y del carrito
    const { usuario } = useContext(AuthContext)
    const { carritoProductos, carritoCargado, dispatch } = useCarrito()

    // Estados
    const [productos, setProductos] = useState(null)
    const [subtotal, setSubtotal] = useState(0)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // UseEffect para obtener los productos
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await obtenerProductosTienda(usuario.datosUsuario.id_carrito)
                setProductos(respuesta)
            } catch (error) {
                setModalErrorAPI(true)
            }
        }
        obtenerProductos()
    }, [])

    // Funcion para calcular el subtotal
    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    };

    // UseEffect para calcular el subtotal y actualizar los productos
    useEffect(() => {
        if (carritoProductos.length > 0) {
            setSubtotal(calcularTotal(carritoProductos))
            const idsEnCarrito = carritoProductos.map(p => p.id_producto);
            const productosActualizados = productos.map(producto => ({
                ...producto,
                enCarrito: idsEnCarrito.includes(producto.id),
            }));
            setProductos(productosActualizados);
        }
    }, [carritoProductos])

    // UseFocusEffect para obtener los productos
    useFocusEffect(
        useCallback(() => {
            const obtenerProductos = async () => {
                try {
                    const respuesta = await obtenerProductosTienda(usuario.datosUsuario.id_carrito)
                    setProductos(respuesta)
                } catch (error) {
                    setModalErrorAPI(true)
                }
            }

            const cargarCarrito = async () => {
                try {
                    const respuesta = await obtenerCarritoProductos(usuario.datosUsuario.id_carrito, usuario.datosUsuario.id)
                    dispatch({ type: 'CARGAR_CARRITO', payload: respuesta });
                    setSubtotal(calcularTotal(respuesta))
                } catch (error) {
                    setModalErrorAPI(true)
                }
            }
            obtenerProductos()
            if (carritoProductos.length == 0 && carritoCargado == false) {
                cargarCarrito()
            }
        }, [])
    );

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>

            <ModalErrorAPI
                visible={modalErrorAPI}
                textInfo={"Ha ocurrido un error del lado del servidor"}
                cerrar={() => { setModalErrorAPI(false) }}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Tienda"}
                        textInfo1={"Bienvenid@ a nuestra tienda, aqui encontraras productos sobre manicura y pedicura"}
                    />
                    {productos == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>Cargando productos...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={productos}
                            numColumns={2}

                            contentContainerStyle={{
                                gap: 20,
                                marginBottom: 20
                            }}
                            columnWrapperStyle={{
                                justifyContent: "center",
                                gap: 20
                            }}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <CardProducto
                                    href={`/navegacion/cliente/(tabs-cliente)/(tienda)/(screens)/${item.id}`}
                                    fuenteTextoBold={fuenteTexto.gantariBold}
                                    fuenteTextoRegular={fuenteTexto.gantariRegular}
                                    productoImg={item.url_imagen}
                                    nombre={item.nombre}
                                    precio={item.precio}
                                    enCarrito={item.enCarrito}
                                    agotado={item.agotado}
                                    onAnadir={async () => {
                                        try {
                                            await anadirCarritoProducto(usuario.datosUsuario.id_carrito, item.id, 1)
                                            dispatch({ type: 'ANADIR_PRODUCTO', payload: { id_producto: item.id, nombre: item.nombre, cantidad: 1, precio: item.precio, stock: item.stock } });
                                        } catch (error) {
                                            setModalErrorAPI(true)
                                        }
                                    }}
                                />
                            }
                            scrollEnabled={false}

                        >
                        </FlatList>
                    )}

                    {
                        /*<View style={styles.contenedorProductos}>
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                    />
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                        enCarrito={true}
                    />
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                        agotado={true}
                    />
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                    />
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                    />
                    <CardProducto
                        href={"(tabs-cliente)/(tienda)/(screens)/1"}
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        productoImg={producto}
                    />
                </View>*/
                    }
                </ScrollView>
            </View>
            <BarraResumen
                botonCarrito={true}
                cantidadProductos={carritoProductos.length}
                subtotal={subtotal}
                hrefCarrito={"/navegacion/cliente/(clienteScreens)/(pedidosCarrito)/carritoCliente"}
            />

        </Screen>
    );
}