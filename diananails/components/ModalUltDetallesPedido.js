import { Modal, StyleSheet, Text, View, FlatList } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import { fuenteTextoStyles } from "../styles/fuenteTextoStyles";

// Modal ModalUltDetallesPedido
export const ModalUltDetallesPedido = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Obtenemos las fuentes
    const fuenteTexto = fuenteTextoStyles();

    // Estilos del componente
    const styles = StyleSheet.create({
        modalFondo: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',  // Fondo semi-transparente
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalContenido: {
            backgroundColor: tema.background,
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center'
        },
        textTituloModal: {
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(3),
            marginBottom: 10
        },
        textSubtituloModal: {
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(2),
            marginBottom: 5
        },
        textInfoModal: {
            fontFamily: "GantariRegular",
            textAlign: "center",
            fontSize: hp(2),
        }
    })

    // Renderizamos el componente
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.cerrar}
        >
            <View style={styles.modalFondo}>
                <View style={styles.modalContenido}>
                    <Text style={styles.textTituloModal}>Ultimos detalles de tu pedido</Text>
                    <View style={{ gap: 10 }}>
                        <View>
                            <Text style={styles.textSubtituloModal}>Direccion de envio</Text>
                            <Text style={styles.textInfoModal}>{props.direccionDeEnvio}</Text>
                        </View>
                        <View>
                            <Text style={styles.textSubtituloModal}>Metodo de pago</Text>
                            <FlatList
                                data={props.metodosPago}
                                numColumns={2}
                                style={{ maxHeight: hp(11.6) }}

                                contentContainerStyle={{
                                    gap: 10,

                                }}
                                columnWrapperStyle={{
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 10,

                                }}
                                renderItem={({ item }) =>
                                    <BotonTexto
                                        botonNavegacion={true}
                                        esLink={false}
                                        fondo={props.metodoPagoSelec.idMetodoPago === item.idMetodoPago}
                                        fuenteTexto={fuenteTexto.gantariRegular}
                                        textoBoton={item.metodoPago}
                                        onPress={() => props.setMetodoPago(item)}
                                    />
                                }

                            ></FlatList>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={false}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Cancelar"}
                            onPress={props.cerrar}

                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={props.navegacion ? true : false}
                            href={props.navegacion ? props.href : false}
                            fondo={true}
                            deshabilitado={props.metodoPagoSelec.idMetodoPago === null}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Confirmar pedido"}
                            onPress={props.aceptar}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    )
}
