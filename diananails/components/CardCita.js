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
            <Pressable style={styles.contenedorCita}>
                {props.mostrarCliente && (
                    <>
                        <View>
                            <Text style={[styles.textTituloSeccionCita, { marginBottom: 5 }]}>Cliente</Text>
                            <ImagenNombre
                                imagen={props.clienteImg}
                                nombre={props.clienteNombre}
                                textNormal={true}
                            />
                        </View>
                        <View style={styles.lineaDivisora}></View>
                    </>
                )}
                <View>
                    <Text style={styles.textTituloSeccionCita}>Servicios</Text>
                    <View>
                        <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                        <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                        <Text style={styles.textInfoCita}>Manicura y pedicura</Text>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View>
                    <Text style={styles.textTituloSeccionCita}>Fecha y hora</Text>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textSubTituloInfoCita}>Fecha: </Text>
                            <Text style={styles.textInfoCita}>10/10/2025</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textSubTituloInfoCita}>Hora: </Text>
                            <Text style={styles.textInfoCita}>09:45 a 10:30</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.lineaDivisora}></View>
                <View>
                    <Text style={[styles.textTituloSeccionCita, { marginBottom: 5 }]}>Manicurista</Text>
                    <ImagenNombre
                        imagen={props.manicuristaImg}
                        nombre={props.manicuristaNombre}
                        textNormal={true}
                    />
                </View>
                <View style={styles.lineaDivisora}></View>
                <View>
                    <Text style={styles.textTituloSeccionCita}>Metodo de pago</Text>
                    <View>
                        <Text style={styles.textInfoCita}>Efectivo</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}
