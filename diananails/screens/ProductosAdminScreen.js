import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { useState, useEffect, useContext, useCallback } from "react";
import { tiendaStyles } from "../styles/tiendaStyles";
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { CardProducto } from "../components/CardProducto";
import { AuthContext } from "./../contexts/authContext"
import { obtenerProductosAdmin, obtenerProductosTienda } from "../api/ProductosController";
import { useFocusEffect } from "expo-router";
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de ProductosAdmin
export const ProductosAdminScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(tiendaStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estado de productos
    const [productos, setProductos] = useState(null)

    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // UseEffect para obtener los productos
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await obtenerProductosAdmin(usuario.datosUsuario.id)
                setProductos(respuesta)
            } catch (error) {
                setModalErrorAPI(true)
            }
        }
        obtenerProductos()
    }, [])

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
            obtenerProductos()
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
                        tituloSeccion={"Productos"}
                        textInfo1={"Aqui pueder ver todos los productos que vendes"}
                        textInfo2={"Si quiere editar alguno, solo pulselo"}
                    />
                    {/*<View style={styles.contenedorProductos}>
                        <CardProducto
                            href={"/(gestionAdmin)/producto/1"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                        <CardProducto
                            href={"/"}
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            productoImg={producto}
                        />
                    </View>*/}
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
                                    href={`/navegacion/admin/(gestionAdmin)/producto/${item.id}`}
                                    fuenteTextoBold={fuenteTexto.gantariBold}
                                    fuenteTextoRegular={fuenteTexto.gantariRegular}
                                    productoImg={item.url_imagen}
                                    nombre={item.nombre}
                                    precio={item.precio}
                                    agotado={item.agotado}
                                    enCarrito={0}
                                    vistaAdmin={true}
                                    onAnadir={() => { }}
                                />
                            }
                            scrollEnabled={false}

                        >
                        </FlatList>
                    )}

                </ScrollView>
            </View>
        </Screen>
    );
}