import { StyleSheet, View, TextInput, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icono } from "./Icono";

export const SeccionEnTab = (props) => {

    const tema = useThemedStyles() // Acceder al contexto

    const styles = StyleSheet.create({
        contenedorSeccion: {
            marginBottom: hp(1)
        },
        textTitulo: {
            color: tema.onBackground,
            textAlign: "center",
            fontSize: hp(3.5),
            marginVertical: hp(0.5)
        },
        textInfo: {
            color: tema.onBackground,
            textAlign: "center",
            fontSize: hp(2.2)
        },
    })

    return (
        <View style={styles.contenedorSeccion}>
            <Text style={[props.fuenteTextoBold, styles.textTitulo]}>{props.tituloSeccion}</Text>
            <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.textInfo1}</Text>
            {props.textInfo2 && (
                <Text style={[props.fuenteTextoRegular, styles.textInfo]}>{props.textInfo2}</Text>
            )}
        </View>
    )
}

