import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const tiendaStyles = (colors) => StyleSheet.create({
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
    containerProductos: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: hp(1.5),
        justifyContent: "space-evenly",
        gap: hp(2.5)
    },
    containerProducto: {
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        width: wp(40),
    },
    productoImg: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    containerInfoProducto: {
        padding: 5
    },
    textTitleProducto: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2),
        marginBottom: hp(0.5)
    },
    textPrecioProducto: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        fontSize: hp(2),
        marginBottom: hp(1)
    },
    containerCantidadProducto: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: wp(3),
        marginBottom: hp(1)
    },
    containerBotonCantidadProducto: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        padding: 5
    },
    iconoCantidad: {
        color: colors.onPrimary,
        fontSize: hp(2)
    },
    textCantidadProducto: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        fontSize: hp(2),
    },
    containerBotonAnadirProducto: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    botonAnadirProducto: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 7
    },
    botonEnCarrito: {
        backgroundColor: colors.secondary
    },
    textBotonAnadirProducto: {
        color: colors.onPrimary,
        fontFamily: "GantariBold",
        fontSize: hp(2),
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