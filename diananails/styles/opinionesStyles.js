import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const opinionesStyles = (colors) => StyleSheet.create({
    textTituloInput: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    contenedorFiltroOpiniones: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 15
    },
    lineaDivisora: {
        borderTopWidth: 1,
        borderColor: colors.primary,
        marginVertical: 20
    },
    contenedorOpiniones: {
        marginTop: hp(2),
        marginBottom: hp(2),
        gap: 15
    },
    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    }
});