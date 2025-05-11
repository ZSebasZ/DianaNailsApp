import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const gestionStyles = (colors) => StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.background,
        flex: 1,
    },
    textTitle: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(3.5),
        marginBottom: hp(1)
    },
    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        textAlign: "center",
        fontSize: hp(2.2)
    },
    containerSeccion: {
        marginTop: hp(2),
        justifyContent: "center",
        alignItems: "center",
        gap: hp(3)
    },
    botonGestion: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        gap: wp(3)
    },
    iconoGestion: {
        color: colors.onPrimary,
        fontSize: hp(2.2)
    },
    textoBotonGestion: {
        color: colors.onPrimary,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },

});