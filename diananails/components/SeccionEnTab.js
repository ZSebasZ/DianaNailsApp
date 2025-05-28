import { StyleSheet, View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useThemedStyles } from '../hooks/useThemeStyles';

// Componente SeccionEnTab
export const SeccionEnTab = (props) => {

    // Obtenemos los colores del tema
    const tema = useThemedStyles()

    // Estilos del componente
    const styles = StyleSheet.create({
        contenedorSeccion: {
            marginBottom: hp(2)
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

    // Renderizamos el componente
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

