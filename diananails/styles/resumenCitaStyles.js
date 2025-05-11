import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const resumenCitaStyles = (colors) => StyleSheet.create({
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
    contenedorSeccionDetalle: {
        marginBottom: hp(1)
    },
    textTituloSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(2.8),
        marginBottom: hp(0.8)
    },
    contenedorServicio: {
        backgroundColor: colors.secondaryContainer,
        borderRadius: 10,
        padding: hp(1),
        marginBottom: hp(1.2)
    },
    textNombreServicio: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    contenedorInfoServicio: {
        flexDirection: "row"
    },
    textTitleInfoServicio: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(1.8)
    },
    textInfoServicio: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        fontSize: hp(1.8)
    },
    contenedorFechaHora: {
        flexDirection: "row",
        justifyContent: "center"
    },
    textTituloFechaHora: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    textInfoFechaHora: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        fontSize: hp(2)
    },
    containerManicurista: {
        borderColor: colors.primary, 
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        width: wp(40),
    },
    textTitleManicurista: {
        fontFamily: "GantariBold",
        color: colors.onPrimary,
        fontSize: hp(2.5),
        padding: hp(0.5),
        textAlign: "center"
    },
    manicuristaImg: {
        width: "100%",
        height: 100,
        resizeMode: "cemter",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    containerBotonCancelarCita: {
        position: "absolute",
        bottom: 5,
        left: 5
    },
    containerIconoCancelarCita: {
        borderRadius: 100,
        backgroundColor: colors.errorContainer,
        padding: hp(0.8)
    },
    iconoCancelarCita: {
        color: colors.onErrorContainer,
        fontSize: hp(4)
    },
    containerIconoVerCitas: {
        borderRadius: 100,
        backgroundColor: colors.tertiaryContainer,
        padding: hp(0.8)
    },
    iconoVerCitas: {
        color: colors.onTertiaryContainer,
        fontSize: hp(4)
    },
    containerIconoVerOpiniones: {
        borderRadius: 100,
        backgroundColor: colors.surfaceVariant,
        padding: hp(0.8),
    },
    iconoVerOpiniones: {
        color: colors.onSurfaceVariant,
        fontSize: hp(4)
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
        color: colors.onBackground,
        textAlign: "center"
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