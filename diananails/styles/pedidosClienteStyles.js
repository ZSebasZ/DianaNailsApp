import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const pedidosClienteStyles = (colors) => StyleSheet.create({
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
    filtroPedidos: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: wp(2),
        marginHorizontal: wp(1),
        marginVertical: hp(1)
    },
    botonFiltro: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        padding: 10
    },
    botonFiltroSelec: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        padding: 10
    },
    textBotonFiltro: {
        fontFamily: "GantariRegular",
        color: colors.onBackground,
        fontSize: hp(2)
    },
    textBotonFiltroSelec: {
        fontFamily: "GantariBold",
        color: colors.onPrimary,
        fontSize: hp(2)
    },
    lineaDivisora: {
        borderTopWidth: 1,
        borderColor: colors.onSecondaryContainer,
        marginVertical: hp(1)
    },
    containerPedido: {
        backgroundColor: colors.secondaryContainer,
        padding: 10,
        borderRadius: 10,
        marginVertical: hp(1)
    },
    containerSeccionPedido: {
        marginBottom: hp(1)
    },
    textTitleSeccionPedido: {
        color: colors.onSecondaryContainer,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    textInfoPedido: {
        color: colors.onSecondaryContainer,
        fontFamily: "GantariRegular",
        fontSize: hp(2)
    },
    textSubTitleInfoPedido: {
        color: colors.onSecondaryContainer,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },

});