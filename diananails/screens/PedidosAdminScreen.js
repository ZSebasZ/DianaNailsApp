import { View, ScrollView, FlatList, Text } from "react-native";
import { Screen } from '../components/Screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import { pedidosClienteStyles } from '../styles/pedidosClienteStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";
import { BotonTexto } from "../components/BotonTexto";
import { CardPedido } from "../components/CardPedido";
import { useEffect, useState, useContext } from "react";
import { actualizarPedidoEstado, obtenerPedidosClientes } from "../api/PedidosController";
import { AuthContext } from "../contexts/authContext";
import { ModalLoader } from "../components/ModalLoader";
import { ModalFeedback } from "../components/ModalFeedback";
import { ModalActuPedido } from "../components/ModalActuPedido";
import { ModalErrorAPI } from "../components/ModalErrorAPI";



//Pantalla de PedidosAdmin
export const PedidosAdminScreen = () => {

    // Estilos y fuentes
    const fuenteTexto = fuenteTextoStyles();
    const styles = useThemedStyles(pedidosClienteStyles);

    // Usamos el contexto de autenticación
    const { usuario } = useContext(AuthContext)

    // Estados
    const [filtro, setFiltro] = useState("Pendiente de envío")
    const [textoModalActuPedido, setTextoModalActuPedido] = useState("¿Desea cambiar el estado de este pedido a 'Enviado'?")
    const [pedidos, setPedidos] = useState(null)
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
    const [modalActuPedido, setModalActuPedido] = useState(false)
    const [modalLoaderVisible, setModalLoaderVisible] = useState(false)
    const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false)
    const [modalErrorAPI, setModalErrorAPI] = useState(false)


    // Funcion para obtener los pedidos
    const obtenerPedidos = async () => {
        try {
            setModalLoaderVisible(true)
            const respuesta = await obtenerPedidosClientes(usuario.datosUsuario.id, filtro)
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

    // UseEffect para cargar los pedidos
    useEffect(() => {
        obtenerPedidos()
    }, [])

    // UseEffect para cargar los pedidos segun el filtro
    useEffect(() => {
        setModalLoaderVisible(true)
        const obtenerPedidos = async () => {
            try {
                const respuesta = await obtenerPedidosClientes(usuario.datosUsuario.id, filtro)
                setPedidos(respuesta)
                if (respuesta.length > 0) {
                    setPedidos(respuesta)
                } else {
                    setPedidos(null)
                }
                setModalLoaderVisible(false)
                switch (filtro) {
                    case "Pendiente de envío":
                        setTextoModalActuPedido("¿Desea cambiar el estado de este pedido a ENVIADO?")
                        break;
                    case "Enviado":
                        setTextoModalActuPedido("¿Desea cambiar el estado de este pedido a ENTREGADO?")
                        break;
                }
            } catch (error) {
                setModalLoaderVisible(false)
                setModalErrorAPI(true)
            }
        }
        obtenerPedidos()
    }, [filtro])

    // Funcion para actualizar el estado del pedido
    const actualizarEstadoPedido = async () => {
        try {
            setModalActuPedido(false)
            setModalLoaderVisible(true)
            switch (filtro) {
                case "Pendiente de envío":
                    await actualizarPedidoEstado(pedidoSeleccionado, filtro)
                    break;
                case "Enviado":
                    await actualizarPedidoEstado(pedidoSeleccionado, filtro)
                    break;
            }
            await obtenerPedidos()
            setModalLoaderVisible(false)
            setModalFeedbackVisible(true)
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
            <ModalActuPedido
                texto={textoModalActuPedido}
                visible={modalActuPedido}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => {
                    setPedidoSeleccionado(null)
                    setModalActuPedido(false)
                }}
                aceptar={actualizarEstadoPedido}
            />
            <ModalFeedback
                titulo={"Pedido actualizado"}
                feedback={"El estado del pedido se ha actualizado correctamente"}
                visible={modalFeedbackVisible}
                fuenteTexto={fuenteTexto.gantariBold}
                cerrar={() => setModalFeedbackVisible(false)}
            />

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Pedidos"}
                        textInfo1={"Aquí puedes ver y gestionar todos los pedidos de los clientes"}
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
                            textoBoton={"Entregados"}
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
                    {pedidos == null ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={[styles.textInfo]}>{`No hay pedidos ${filtro == "Pendiente de envío" ? "pendientes de envío" : filtro == "Enviado" ? "enviados" : "recibidos"}`}</Text>
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
                                    mostrarCliente={true}
                                    clienteNombre={item.cliente}
                                    clienteImg={item.clienteImg}
                                    fecha={item.fecha}
                                    estado={item.estado}
                                    total={item.total}
                                    metodoPago={item.metodoPago}
                                    productos={item.productos}
                                    cancelarPedido={(item.estado === "Pendiente de envío" || item.estado === "Enviado") ? true : false}
                                    onPress={() => {
                                        setPedidoSeleccionado(item.id)
                                        setModalActuPedido(true)
                                    }}
                                    esAdmin={true}
                                />
                            }
                            scrollEnabled={false}
                        ></FlatList>
                    )}

                </ScrollView>
            </View>
        </Screen>
    );
}