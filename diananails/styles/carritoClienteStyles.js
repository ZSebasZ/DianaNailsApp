import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Estilos para la screen del carrito
export const carritoClienteStyles = (colors) => StyleSheet.create({
    contenedorProductosCarrito: {
        gap: hp(3),
        marginBottom: hp(2)
    },
    textInfo: {
        color: colors.onBackground,
        fontFamily: "GantariBold",
        fontSize: hp(2.2)
    },
    contenedorBotonCancelarCita: {
        position: "absolute",
        bottom: 5,
        right: 5
    },
});