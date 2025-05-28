import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos para la screen de registro
export const registroStyles = (colors) => StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        justifyContent: 'center',

    },
    textTitulo: {
        fontSize: hp(3.5),
        color: colors.onBackground,
        textAlign: 'center',
        marginVertical: hp(2),
    },
    contenedorBotones: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp(2)
    }
});