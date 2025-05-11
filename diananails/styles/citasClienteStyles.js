import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const citasClienteStyles = (colors) => StyleSheet.create({
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
    textInfoExtra: {
        color: colors.onSurfaceVariant,
        fontFamily: "GantariRegular",
        textAlign: "center",
        fontSize: hp(2.2)
    },

    containerCita: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginVertical: hp(1)
    },
    containerSeccionCita: {
        marginBottom: hp(1)
    },
    textTitleSeccionCita: {
        color: colors.onSecondary,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    textInfoCita: {
        color: colors.onSecondary,
        fontFamily: "GantariRegular",
        fontSize: hp(2)
    },
    textSubTitleInfoCita: {
        color: colors.onSecondary,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },

});