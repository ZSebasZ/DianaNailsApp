import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const inicioStyles = (colors) => StyleSheet.create({
    contenedorPrincipal: {
        paddingTop: hp(3),
    },
    textTitulo: {
        fontSize: hp(3),
        color: colors.onBackground,
        textAlign: 'center',
    },
    textNombreApp: {
        textAlign: 'center',
        color: colors.onBackground,
        fontSize: hp(6),
        marginBottom: hp(3)
    },
    contenedorBotones: {
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    contenedorIconoInstagram: {
        alignItems: 'center',
        marginTop: hp(5),
    }
});
