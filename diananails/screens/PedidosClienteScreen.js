import { View, useColorScheme, ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { pedidosClienteStyles } from '../styles/pedidosClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { CardPedido } from "../components/CardPedido";
import { useEffect, useState, useContext } from "react";
import { cancelarPedidoCliente, obtenerPedidosCliente } from "../api/PedidosController";
import { AuthContext } from "../contexts/authContext";
import { ModalConfirmarAccion } from "../components/ModalConfirmarAccion";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";


//Pantalla de Login
export const PedidosClienteScreen = () => {

    const { usuario } = useContext(AuthContext)
    const [filtro, setFiltro] = useState("Pendiente de envío")
    const [pedidos, setPedidos] = useState([])

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)

    const fuenteTexto = fuenteTextoStyles();
    //Estilos
    const styles = useThemedStyles(pedidosClienteStyles);

    const obtenerPedidos = async () => {
        const respuesta = await obtenerPedidosCliente(usuario.datosUsuario.id, filtro)
        setPedidos(respuesta)
        //console.log(respuesta)
    }

    useEffect(() => {
        obtenerPedidos()
    }, [])

    useEffect(() => {
        const obtenerPedidos = async () => {
            const respuesta = await obtenerPedidosCliente(usuario.datosUsuario.id, filtro)
            setPedidos(respuesta)
            //console.log(respuesta)
        }
        obtenerPedidos()
    }, [filtro])

    const cancelarPedido = async () => {
        try {
            setModalConfirmarAccion(false)
            setModalLoaderVisible(true)
            const respuesta = await cancelarPedidoCliente(pedidoSeleccionado)
            console.log(respuesta)
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
            await obtenerPedidos();
            setPedidoSeleccionado(null)
        } catch (error) {
            console.error("Error al cancelar el pedido")
        }
    }

    return (
        <Screen enTab={true}>

            <ModalLoader
                visible={modalLoaderVisible}
            />
            <ModalConfirmarAccion
                titulo={"¿Está seguro que quiere cancelar este pedido?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setPedidoSeleccionado(null)
                    setModalConfirmarAccion(false)
                }}
                aceptar={cancelarPedido}
            />
            <ModalFeedback
                titulo={"Pedido cancelado"}
                feedback={"El pedido se ha cancelado correctamente"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => setModalFeedbackVisible(false)}
            />

            {pedidos && (
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <SeccionEnTab
                            fuenteTextoBold={fuenteTexto.gantariBold}
                            fuenteTextoRegular={fuenteTexto.gantariRegular}
                            tituloSeccion={"Mis pedidos"}
                            textInfo1={"Aqui se muestran todos tus pedidos"}
                        />
                        <View style={styles.contenedorFiltroPedidos}>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={filtro === "Pendiente de envío"}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Pendientes de envío"}
                                onPress={() => setFiltro("Pendiente de envío")}
                            />
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={filtro === "Enviado"}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Enviados"}
                                onPress={() => setFiltro("Enviado")}
                            />
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={filtro === "Recibido"}
                                fuenteTexto={fuenteTexto.gantariBold}
                                textoBoton={"Recibidos"}
                                onPress={() => setFiltro("Recibido")}
                            />
                        </View>
                        {/*<View style={styles.contenedorPedidos}>
                        <CardPedido
                            productos={"PASAR LOS PRODUCTOS AQUI, DEL JSON"}
                        />
                         <CardPedido
                            productos={"PASAR LOS PRODUCTOS AQUI, DEL JSON"}
                        />
                    </View>*/}

                        <FlatList
                            data={pedidos}
                            contentContainerStyle={{
                                gap: 20,
                                marginBottom: 15
                            }}
                            renderItem={({ item }) =>
                                <CardPedido
                                    fecha={item.fecha}
                                    estado={item.estado}
                                    total={item.total}
                                    productos={item.productos}
                                    cancelarPedido={item.estado === "Pendiente de envío" ? true : false}
                                    onPress={() => {
                                        setPedidoSeleccionado(item.id)
                                        setModalConfirmarAccion(true)
                                    }}
                                />
                            }
                            scrollEnabled={false}
                        ></FlatList>
                    </ScrollView>
                </View>
            )}
        </Screen>
    );
}