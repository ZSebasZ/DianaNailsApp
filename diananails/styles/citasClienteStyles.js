import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos para la screen de las citas del cliente
export const citasClienteStyles = (colors) => StyleSheet.create({
    contenedorCitas: {
        padding: 10,
        paddingTop: 0,
        gap: 20
    },

    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    }
});