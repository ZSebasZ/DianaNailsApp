import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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



//Pantalla de Login
export const TiendaScreen = () => {

    const { usuario } = useContext(AuthContext)
    const [productos, setProductos] = useState([])
    const { carritoProductos, carritoCargado, dispatch } = useCarrito()
    const [subtotal, setSubtotal] = useState(0)

    const producto = require("./../assets/images/manicurista.jpg")
    const fuenteTexto = fuenteTextoStyles();

    useEffect(() => {
        const obtenerProductos = async () => {
            const respuesta = await obtenerProductosTienda(usuario.datosUsuario.id_carrito)
            setProductos(respuesta)
            //console.log(respuesta)
        }
        obtenerProductos()
    }, [])

    const calcularTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.precio * item.cantidad;
        }, 0);
    };


    useEffect(() => {
        if (carritoProductos.length > 0) {
            setSubtotal(calcularTotal(carritoProductos))
            // Extraemos los IDs de los productos que están en el carrito
            const idsEnCarrito = carritoProductos.map(p => p.id_producto);

            // Creamos una nueva lista de productos donde marcamos enCarrito según esté en el carrito
            const productosActualizados = productos.map(producto => ({
                ...producto,
                enCarrito: idsEnCarrito.includes(producto.id),
            }));

            setProductos(productosActualizados);
        }
    }, [carritoProductos])


    useFocusEffect(
        useCallback(() => {
            const obtenerProductos = async () => {
                const respuesta = await obtenerProductosTienda(usuario.datosUsuario.id_carrito)
                setProductos(respuesta)
                //console.log(respuesta)
            }

            const cargarCarrito = async () => {
                const respuesta = await obtenerCarritoProductos(usuario.datosUsuario.id_carrito, usuario.datosUsuario.id)
                console.log(respuesta)
                dispatch({ type: 'CARGAR_CARRITO', payload: respuesta });
                setSubtotal(calcularTotal(respuesta))
            }

            obtenerProductos()
            //setSubtotal(calcularTotal(carritoProductos))

            if (carritoProductos.length == 0 && carritoCargado == false) {
                cargarCarrito()
            }

        }, [])
    );

    return (
        <Screen enTab={true}>
            {productos && (
                <>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <SeccionEnTab
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                fuenteTextoRegular={fuenteTexto.gantariRegular}
                                tituloSeccion={"Tienda"}
                                textInfo1={"Bienvenid@ a nuestra tienda, aqui encontraras productos sobre manicura y pedicura"}
                            />
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
                                        href={`/navegacion/(tabs-cliente)/(tienda)/(screens)/${item.id}`}
                                        fuenteTextoBold={fuenteTexto.gantariBold}
                                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                                        productoImg={producto.url_imagen}
                                        nombre={item.nombre}
                                        precio={item.precio}
                                        enCarrito={item.enCarrito}
                                        agotado={item.agotado}
                                        onAnadir={async () => {
                                            await anadirCarritoProducto(usuario.datosUsuario.id_carrito, item.id, 1)
                                            dispatch({ type: 'ANADIR_PRODUCTO', payload: { id_producto: item.id, nombre: item.nombre, cantidad: 1, precio: item.precio, stock: item.stock } });
                                        }}
                                    />
                                }
                                scrollEnabled={false}

                            >
                            </FlatList>
                            {/*<View style={styles.contenedorProductos}>
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
                    </View>*/}
                        </ScrollView>
                    </View>
                    <BarraResumen
                        botonCarrito={true}
                        cantidadProductos={carritoProductos.length}
                        subtotal={subtotal}
                        hrefCarrito={"/navegacion/(clienteScreens)/(pedidosCarrito)/carritoCliente"}
                    />
                </>
            )}

        </Screen>
    );
}