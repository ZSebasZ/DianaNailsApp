import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BotonTexto } from "./BotonTexto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icono } from "./Icono";

// Modal ModalServiciosSelec
export const ModalServiciosSelec = (props) => {

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
            backgroundColor: tema.background,
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center'
        },
        textTituloModal: {
            color: tema.onBackground,
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(3),
            marginBottom: 10
        },
        textSubtituloModal: {
            color: tema.onBackground,
            textAlign: "center",
            fontFamily: "GantariBold",
            fontSize: hp(2),
            marginBottom: 5
        },
        textInfoModal: {
            color: tema.onBackground,
            fontFamily: "GantariRegular",
            textAlign: "center",
            fontSize: hp(2),
        }
    })

    // Funcion que calcula el tiempo requerido
    const calcularTiempoRequerido = (lapsos) => {
        const totalMinutos = lapsos * 15;
        const horas = Math.floor(totalMinutos / 60);
        const minutos = totalMinutos % 60;

        let resultado = "";
        if (horas > 0) {
            resultado += `${horas} hora${horas > 1 ? "s" : ""}`;
        }
        if (minutos > 0) {
            if (horas > 0) resultado += " y ";
            resultado += `${minutos} minuto${minutos > 1 ? "s" : ""}`;
        }

        return resultado || "0 minutos";
    };

    // Funcion que formatea el precio
    function formatearPrecio(num) {
        // Formatear con dos decimales fijos
        let precio = num.toFixed(2);

        // Separar parte entera y decimal
        let [entero, decimal] = precio.split('.');

        // Asegurar que la parte entera tenga al menos dos dígitos
        if (entero.length < 2) {
            entero = '0' + entero;
        }

        return `${entero}.${decimal}`;
    }

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
                    <Text style={styles.textTituloModal}>Servicios seleccionados</Text>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', gap: 10 }}>
                        {props.servicios.length > 0 ? props.servicios.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: "2%" }}>
                                <View style={{ width: props.editable == true ? "79%" : "100%", backgroundColor: tema.secondaryContainer, padding: 10, borderRadius: 10, gap: 5 }}>
                                    <Text style={{ fontFamily: "GantariRegular", fontSize: hp(2), color: tema.onSecondaryContainer }}><Text style={{ fontFamily: "GantariBold" }}>Servicio: </Text>{item.nombre}</Text>
                                    <Text style={{ fontFamily: "GantariRegular", fontSize: hp(2), color: tema.onSecondaryContainer }}><Text style={{ fontFamily: "GantariBold" }}>Precio: </Text>{formatearPrecio(item.precio)} €</Text>
                                    <Text style={{ fontFamily: "GantariRegular", fontSize: hp(2), color: tema.onSecondaryContainer }}><Text style={{ fontFamily: "GantariBold" }}>Tiempo: </Text>{calcularTiempoRequerido(item.horas_requeridas)}</Text>
                                </View>
                                {props.editable == true && (
                                    <View style={{ width: "19%" }}>
                                        <Pressable
                                            style={{ flex: 1, backgroundColor: tema.errorContainer, padding: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
                                            onPress={() => props.eliminarServicio(item)}
                                        >
                                            <Icono IconComponent={MaterialCommunityIcons} name={"delete"} style={{ color: tema.error, fontSize: hp(3.5) }} />
                                        </Pressable>
                                    </View>
                                )}

                            </View>
                        )) :
                            <Text style={styles.textInfoModal}>No hay servicios seleccionados</Text>
                        }
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <BotonTexto
                            botonNavegacion={true}
                            esLink={false}
                            fondo={true}
                            fuenteTexto={props.fuenteTexto}
                            textoBoton={"Aceptar"}
                            onPress={props.cerrar}

                        />
                    </View>
                </View>
            </View>

        </Modal>
    )
}
