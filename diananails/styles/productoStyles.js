import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const productoStyles = (colors) => StyleSheet.create({
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
    productoImg: {
        width: "90%",
        height: hp(35),
        borderRadius: 20
    },
    lineaDivisora: {
        borderTopWidth: 2,
        marginVertical: hp(2),
        borderColor: colors.primary
    },
    containerSeccionInfo: {
        marginBottom: hp(1)
    },
    textTitleInfoProducto: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.5),
        marginBottom: hp(0.5)
    },
    textInfoProducto: {
        color: colors.onBackground,
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
    botonAnadir: {
        marginTop: hp(1),
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10
    },
    textBotonAnadir: {
        color: colors.onPrimary,
        fontFamily: "GantariBold",
        fontSize:hp(2.5)
    },
    botonEnCarrito: {
        marginTop: hp(1),
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10
    },
    textBotonEnCarrito: {
        color: colors.onSecondary,
        fontFamily: "GantariBold",
        fontSize:hp(2.5)
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