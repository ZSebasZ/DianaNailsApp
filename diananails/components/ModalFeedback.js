import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagenNombre } from "./ImagenNombre";
import { BotonTexto } from "./BotonTexto";



export const ModalFeedback = (props) => {
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
            fontFamily: "GantariBold",
            fontSize: hp(3)
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
                    <Text style={styles.textTituloModal}>Exito</Text>
                    <Text style={styles.textInfoModal}>Te has registro con exito, ahora inicia sesion</Text>
                    <BotonTexto
                        botonNavegacion={true}
                        esLink={true}
                        href={"../"}
                        fondo={true}
                        fuenteTexto={props.fuenteTexto}
                        textoBoton={"Aceptar"}

                    />
                </View>
            </View>

        </Modal>
    )
}
