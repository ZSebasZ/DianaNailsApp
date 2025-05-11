import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const carritoClienteStyles = (colors) => StyleSheet.create({
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
    containerProducto: {
        backgroundColor: colors.secondaryContainer,
        padding: 10,
        borderRadius: 10,
        marginVertical: hp(1)
    },
    productoImg: {
        width: "100%",
        height: hp(30),
        borderRadius: 10,
        marginBottom: hp(1)
    },
    containerSeccionPedido: {
        marginBottom: hp(1)
    },
    containerSeccionInfoProducto: {
        flexDirection: "row",
        marginBottom: hp(1)
    },
    textTitleInfoProducto: {
        textAlign: "center",
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    textSubTitleInfoProducto: {
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    textInfoProducto: {
        fontFamily: "GantariRegular",
        fontSize: hp(2)
    },
    containerCantidadProducto: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: wp(7)
    },
    botonCantidadProducto: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 10
    },
    iconoCantidadProducto: {
        color: colors.onPrimary,
        fontSize: hp(1.8)
    },
    botonEliminarProducto: {
        backgroundColor: colors.error,
        padding: 10,
        borderRadius: 10
    },
    textBotonEliminarProducto: {
        color: colors.onError,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    resumeBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: hp(1),
        paddingHorizontal: hp(1),
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderColor: colors.outline
    },
    resumenBarContainers: {
        flex: 1,
    },
    resumenBarContainerLeft: {
        alignItems: "flex-start",
    },
    resumenBarContainerLeftBoton: {
        borderRadius: 100,
        backgroundColor: colors.primary,
        padding: hp(0.8)
    },
    resumenBarContainerLeftIcon: {
        color: colors.onPrimary,
        fontSize: hp(2.8)
    },
    resumenBarContainerCenter: {
        alignItems: "center",
    },
    resumenBarContainerCenterTextTitle: {
        fontFamily: "GantariBold",
        fontSize: hp(2),
        color: colors.onBackground
    },
    resumenBarContainerCenterTextPrecio: {
        fontFamily: "GantariRegular",
        fontSize: hp(1.8),
        color: colors.onBackground
    },
    resumenBarContainerRight: {
        alignItems: "flex-end",
    },
    resumenBarContainerRightBoton: {
        borderRadius: 20,
        backgroundColor: colors.primary,
        padding: hp(0.8)
    },
    resumenBarContainerRightBotonText: {
        fontFamily: "GantariBold",
        fontSize: hp(2),
        color: colors.onPrimary
    },

});