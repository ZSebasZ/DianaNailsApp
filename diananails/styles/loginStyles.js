import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const loginStyles = (colors) => StyleSheet.create({
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
    },
    credencialesIncorrectas: {
        color: colors.error,
        textAlign: "center",
        fontFamily: "GantariRegular",
        fontSize: hp(2)
    }
});