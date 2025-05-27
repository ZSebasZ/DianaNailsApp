import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagenNombre } from "./ImagenNombre";
import { BotonTexto } from "./BotonTexto";



export const ModalActuPedido = (props) => {
    const tema = useThemedStyles()

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
            color: tema.onBackground,
            fontFamily: "GantariBold",
            fontSize: hp(3)
        },
        textInfoModal: {
            color: tema.onBackground,
            fontFamily: "GantariRegular",
            textAlign: "center",
            fontSize: hp(2),
            marginBottom: 10
        }
    })

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.cerrar}
        >
            <View style={styles.modalFondo}>
                <View style={styles.modalContenido}>
                    <Text style={styles.textTituloModal}>Actualización del estado del pedido</Text>
                    <Text style={styles.textInfoModal}>{props.texto}</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
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
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Aceptar"}
                            onPress={props.aceptar}
                        />
                    </View>

                </View>
            </View>

        </Modal>
    )
}
