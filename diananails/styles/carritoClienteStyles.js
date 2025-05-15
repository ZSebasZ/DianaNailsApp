import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const carritoClienteStyles = (colors) => StyleSheet.create({
    contenedorProductosCarrito: {
        gap: hp(3),
        marginBottom: hp(2)
    }
});