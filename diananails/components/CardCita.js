import { Pressable, StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagenNombre } from "./ImagenNombre";



export const CardCita = (props) => {
    const tema = useThemedStyles()

    const styles = StyleSheet.create({
        contenedorCita: {
            backgroundColor: tema.secondaryContainer,
            padding: 10,
            borderRadius: 10,
        },
        lineaDivisora: {
            borderTopWidth: 1,
            borderColor: tema.onSecondaryContainer,
            marginVertical: hp(1)
        },
        textTituloSeccionCita: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariBold",
            fontSize: hp(2.3)
        },
        textInfoCita: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariRegular",
            fontSize: hp(2)
        },
        textSubTituloInfoCita: {
            color: tema.onSecondaryContainer,
            fontFamily: "GantariBold",
            fontSize: hp(2)
        },

    })

    return (
        <View>
            <Pressable
                style={styles.contenedorCita}
                onPress={props.onPress}
            >
                {props.mostrarCliente && (
                    <>
                        <View>
                            <Text style={[styles.textTituloSeccionCita, { marginBottom: 5 }]}>Cliente</Text>
                            <ImagenNombre
                                imagen={props.datosCita.clienteImg}
                                nombre={props.datosCita.cliente}
                                textNormal={true}
                            />
                        </View>
                        <View style={styles.lineaDivisora}></View>
                    </>
                )}
                <View>
                    <Text style={styles.textTituloSeccionCita}>Servicios</Text>
                    <View>
                        {props.datosCita.servicios.map((servicio, index) => (
                            <Text key={index} style={styles.textInfoCita}>
                                {servicio}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View>
                    <Text style={styles.textTituloSeccionCita}>Fecha y hora</Text>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textSubTituloInfoCita}>Fecha: </Text>
                            <Text style={styles.textInfoCita}>{props.datosCita.fecha.split('T')[0]}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textSubTituloInfoCita}>Hora: </Text>
                            <Text style={styles.textInfoCita}>{props.datosCita.horaInicio} a {props.datosCita.horaFin}</Text>
                        </View>
                    </View>
                </View>
                {props.datosCita.manicurista && (
                    <>
                        <View style={styles.lineaDivisora}></View>
                        <View>
                            <Text style={[styles.textTituloSeccionCita, { marginBottom: 5 }]}>Manicurista</Text>
                            <ImagenNombre
                                imagen={props.datosCita.manicuristaImg}
                                nombre={props.datosCita.manicurista}
                                textNormal={true}
                            />
                        </View>
                    </>
                )}
                <View style={styles.lineaDivisora}></View>
                <View>
                    <Text style={styles.textTituloSeccionCita}>Metodo de pago</Text>
                    <View>
                        <Text style={styles.textInfoCita}>{props.datosCita.metodoPago}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
