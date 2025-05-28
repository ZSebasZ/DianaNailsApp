import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Componente ContenedorInputs
export const ContenedorInputs = ({ children }) => {
    return (
        <View style={styles.contenedorInputs}>
            {children}
        </View>
    )
}

// Estilos para el componente ContenedorInputs
const styles = StyleSheet.create({
    contenedorInputs: {
        gap: hp(2),
        marginBottom: hp(2)
    },
})