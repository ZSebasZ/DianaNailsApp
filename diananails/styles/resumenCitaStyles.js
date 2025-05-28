import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos para la screen de resumen de cita
export const resumenCitaStyles = (colors) => StyleSheet.create({
    contenedorSeccionDetalle: {
        marginBottom: hp(2)
    },
    textTituloSubSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(2.8),
        marginBottom: hp(0.8)
    },
    contenedorServiciosSeleccionados: {
        gap: hp(1.5)
    },
    contenedorFechaHora: {
        flexDirection: "row",
        justifyContent: "center"
    },
    textSubTituloSubSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2)
    },
    textInfoSubSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariRegular",
        fontSize: hp(2),
        textAlign: "center"
    },
});