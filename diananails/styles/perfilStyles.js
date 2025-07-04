import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos para la screen de perfil
export const perfilStyles = (colors) => StyleSheet.create({
    textTituloSeccion: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        textAlign: "center",
        fontSize: hp(3),
    },

    textImagenRequerida: {
        color: colors.error,
        textAlign: "center",
        fontFamily: "GantariRegular",
        
    },
    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    }
});