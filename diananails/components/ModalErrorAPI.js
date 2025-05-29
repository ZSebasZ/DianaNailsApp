import { Modal, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";

// Modal ModalConfirmarAccion
export const ModalErrorAPI = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
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
            color: tema.onBackground,
            color: tema.onErrorContainer,
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(3),
            marginBottom: 10
        },
        textInfoModal: {
            color: tema.onBackground,
            fontFamily: "GantariRegular",
            textAlign: "center",
            fontSize: hp(2),
            marginBottom: 10
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
                    <Text style={styles.textTituloModal}>Ops ha ocurrido un error</Text>
                     <Text style={styles.textInfoModal}>{props.textInfo}</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Aceptar"}
                            tipoError={true}
                            onPress={props.cerrar}
                        />

                    </View>
                </View>
            </View>

        </Modal>
    )
}
