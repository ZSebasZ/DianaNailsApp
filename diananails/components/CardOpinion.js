import { StyleSheet, Text, View } from "react-native"
import { useThemedStyles } from "../hooks/useThemeStyles"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icono } from "./Icono";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ImagenNombre } from "./ImagenNombre";

// Componente CardOpinion
export const CardOpinion = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorOpinion: {
            backgroundColor: tema.secondaryContainer,
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 10,
            gap: 6
        },
        textTituloOpinion: {
            fontFamily: "GantariBold",
            color: tema.onSecondaryContainer,
            fontSize: hp(2.4),
        },
        textClienteOpinion: {
            fontFamily: "GantariBold",
            color: tema.onSecondaryContainer,
            fontSize: hp(2.2),
        },
        textFechaOpinion: {
            fontFamily: "GantariRegular",
            color: tema.secondary,
            fontSize: hp(2),
        },
        textTextoOpinion: {
            fontFamily: "GantariRegular",
            color: tema.onSecondaryContainer,
            fontSize: hp(2),
        },
        iconoEstrellaOpiniones: {
            color: tema.onSecondaryContainer,
            fontSize: hp(2.5),
        },
        contenedorEstrellas: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 8
        },
    })

    // Renderizamos el componente
    return (
        <View style={styles.contenedorOpinion}>
            <Text style={styles.textTituloOpinion}>{props.titulo}</Text>
            <ImagenNombre
                imagen={props.clienteImg}
                nombre={props.clienteNombre}
            />
            <Text style={styles.textFechaOpinion}>{props.fecha.split('T')[0]}</Text>
            <Text style={styles.textTextoOpinion}>{props.opinion}</Text>
            <View style={[styles.contenedorEstrellas, { justifyContent: "flex-start" }]}>
                {[...Array(5)].map((_, i) => (
                    <Icono
                        key={i}
                        IconComponent={MaterialCommunityIcons}
                        name={i < props.estrellas ? "star" : "star-outline"}
                        onPrimary={false}
                        style={styles.iconoEstrellaOpiniones}
                    />
                ))}
            </View>
        </View>
    )
}
