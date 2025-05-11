import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const opinionesStyles = (colors) => StyleSheet.create({
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
        marginBottom: hp(1)
    },
    containerField: {
        marginBottom: hp(1)
    },
    textTitleInput: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    containerInput: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.primary,
        color: colors.primary,
        marginVertical: hp(0.5),
        alignItems: 'center',
        padding: 10,
        height: hp(6),
    },
    textInput: {
        flex: 1,
        fontFamily: 'GantariRegular',
        color: colors.onBackground,
        fontSize: hp(2),
    },
    containerSeccionFiltro: {
        marginTop: hp(1.5)
    },
    textTitleFiltro: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2),
        textAlign: "center"
    },
    containerFiltros: {
        flexDirection: "row",
        justifyContent: "center",
        gap: wp(2),
        marginTop: hp(1)
    },
    botonEnviarOpinion: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10
    },
    textBotonEnviarOpinion: {
        color: colors.onPrimary,
        fontFamily: "GantariBold",
        fontSize: hp(2.2),
    },
    botonFiltroAntiguedad: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary
    },
    botonFiltroAntiguedadSelec: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary
    },
    textBotonFiltroAntiguedad: {
        fontFamily: "GantariRegular",
        color: colors.onBackground,
        fontSize: hp(2.2),
    },
    textBotonFiltroAntiguedadSelec: {
        fontFamily: "GantariBold",
        color: colors.onPrimary,
        fontSize: hp(2.2),
    },
    iconoEstrella: {
        color:colors.primary,
        fontSize: hp(4)
    },
    lineaDivisora: {
        borderTopWidth: 1,
        marginVertical: hp(2),
        borderColor: colors.primary
    },
    containerOpiniones: {
        marginTop: hp(1)
    },
    containerOpinion: {
        backgroundColor: colors.secondaryContainer,
        padding: 10,
        borderRadius: 10,
        marginBottom: hp(1.5)
    },
    textTituloOpinion: {
        fontFamily: "GantariBold",
        color: colors.onSecondaryContainer,
        fontSize: hp(2.2),
        marginBottom: hp(0.5)
    },
    textClienteOpinion:{
        fontFamily: "GantariBold",
        color: colors.onSecondaryContainer,
        fontSize: hp(2),
        marginBottom: hp(0.5)
    },
    textFechaOpinion: {
        fontFamily: "GantariRegular",
        color: colors.secondary,
        fontSize: hp(1.8),
        marginBottom: hp(0.5)
    },
    textTextoOpinion: {
        fontFamily: "GantariRegular",
        color: colors.onSecondaryContainer,
        fontSize: hp(1.8),
        marginBottom: hp(0.5)
    },
    iconoEstrellaOpiniones: {
        color: colors.onSecondaryContainer,
        fontSize: hp(2.5),
    },

});