import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagenNombre } from "./ImagenNombre";
import { BotonTexto } from "./BotonTexto";



export const ModalConfirmarAccion = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        modalFondo: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',  // Fondo semi-transparente
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalContenido: {
            backgroundColor: tema.errorContainer,
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center'
        },
        textTituloModal: {
            color: tema.onErrorContainer,
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(3),
            marginBottom: 20
        },
        textInfoModal: {
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
                    <Text style={styles.textTituloModal}>¿Está seguro que quiere cancelar la cita?</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Cancelar"}
                            tipoError={true}
                            onPress={props.cerrar}

                        />
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={false}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Aceptar"}
                            tipoError={true}
                            onPress={props.aceptar}
                        />

                    </View>
                </View>
            </View>

        </Modal>
    )
}
