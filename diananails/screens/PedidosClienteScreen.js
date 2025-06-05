import { View, ScrollView, FlatList, Text } from "react-native";
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
import { ModalErrorAPI } from "../components/ModalErrorAPI";


//Pantalla de PedidosCliente
export const PedidosClienteScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(pedidosClienteStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estados
    const [filtro, setFiltro] = useState("Pendiente de envío")
    const [pedidos, setPedidos] = useState(null)
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [modalConfirmarAccion, setModalConfirmarAccion] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Funcion para obtener los pedidos
    const obtenerPedidos = async () => {
        try {
            setModalLoaderVisible(true)
            const respuesta = await obtenerPedidosCliente(usuario.datosUsuario.id, filtro)
            if (respuesta.length > 0) {
                setPedidos(respuesta)
            }
            setModalLoaderVisible(false)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)
        }

    }

    // UseEffect para obtener los pedidos
    useEffect(() => {
        obtenerPedidos()
    }, [])

    // UseEffect para obtener los pedidos segun el filtro
    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                setModalLoaderVisible(true)
                const respuesta = await obtenerPedidosCliente(usuario.datosUsuario.id, filtro)
                if (respuesta.length > 0) {
                    setPedidos(respuesta)
                } else {
                    setPedidos(null)
                }
                setModalLoaderVisible(false)
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
        obtenerPedidos()
    }, [filtro])

    // Funcion para cancelar el pedido
    const cancelarPedido = async () => {
        try {
            setModalConfirmarAccion(false)
            setModalLoaderVisible(true)
            const respuesta = await cancelarPedidoCliente(pedidoSeleccionado)
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
            await obtenerPedidos();
            setPedidoSeleccionado(null)
        } catch (error) {
            setModalLoaderVisible(false)
            setModalErrorAPI(true)  
        }
    }

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
            <ModalConfirmarAccion
                titulo={"¿Está seguro de que quiere cancelar este pedido?"}
                visible={modalConfirmarAccion}
                cerrar={() => {
                    setPedidoSeleccionado(null)
                    setModalConfirmarAccion(false)
                }}
                aceptar={cancelarPedido}
                fuenteTexto={fuenteTexto.gantariBold}
            />
            <ModalFeedback
                titulo={"Pedido cancelado"}
                feedback={"El pedido se ha cancelado correctamente"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => setModalFeedbackVisible(false)}
            />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Mis pedidos"}
                        textInfo1={"Aquí puedes ver todos tus pedidos"}
                    />
                    <View style={styles.contenedorFiltroPedidos}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={filtro === "Pendiente de envío"}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Pendientes de envío"}
                            onPress={() => {
                                setPedidos([])
                                setFiltro("Pendiente de envío")
                            }}
                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={filtro === "Enviado"}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Enviados"}
                            onPress={() => {
                                setPedidos([])
                                setFiltro("Enviado")
                            }}
                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={filtro === "Recibido"}
                            fuenteTexto={fuenteTexto.gantariBold}
                            textoBoton={"Recibidos"}
                            onPress={() => {
                                setPedidos([])
                                setFiltro("Recibido")
                            }}
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

                    {pedidos == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>{`No tienes pedidos ${filtro == "Pendiente de envío" ? "pendientes de envío" : filtro == "Enviado" ? "enviados" : "recibidos"}`}</Text>
                        </View>
                    ) : (
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
                                    metodoPago={item.metodoPago}
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
                    )}

                </ScrollView>
            </View>

        </Screen >
    );
}